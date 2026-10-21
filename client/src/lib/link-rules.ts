/**
 * Auto-linking rules shared by the React site (client/src/lib/auto-link.tsx)
 * and the static-HTML pass (scripts/auto-link-html.ts).
 *
 * Only *existing* terms are turned into links — no sentence, word or mention
 * is ever added, removed or reworded.
 *
 * Link targets
 * ------------
 *   function     /function/<Name>                every name in functions.json
 *   enumeration  /enumeration/<slug>#<member>     every constant + every X.Type
 *   data type    /datatypes#<anchor>
 *
 * Matching rules
 * --------------
 *   A. "Always" terms — function names, enumeration constants (JoinKind.Inner),
 *      enumeration type names (Order.Type) and unambiguous data-type labels
 *      ("Decimal number", "True/False", "Date/Time/Timezone", bare
 *      "datetime"/"datetimezone") — are linked wherever they appear in prose.
 *   B. Generic data-type words (text, date, time, number, binary, duration,
 *      logical, any, currency, percentage) are only linked where the sentence
 *      is genuinely naming a type: after as / type / nullable / optional / is,
 *      or after an article (a / an / the), or bare inside inline code.
 *      Two stock English idioms are excluded ("a number of…", "…time zone").
 *   C. Never inside <pre> code blocks, <a>, <script>, <style>, <title> or the
 *      document's own <h1> (HTML files).
 */

import { functionNames } from "../data/function-names";
import {
  enumerations,
  enumerationHref,
  enumerationMemberNames,
  memberHref,
} from "../data/enumerations";

export type LinkKind = "function" | "enumeration" | "datatype";

export interface LinkMatch {
  start: number;
  end: number;
  href: string;
  kind: LinkKind;
}

export interface Segment {
  text: string;
  href?: string;
  kind?: LinkKind;
}

/* ------------------------------------------------------------------ data types */

const DATATYPES_PAGE = "/datatypes";

interface DataTypeTarget {
  label: string;
  anchor: string;
  /** true → linked anywhere in prose; false → only in type context (rule B) */
  bare: boolean;
}

/** Anchors mirror client/src/pages/data-types.tsx (lowercase, non-alnum → "-"). */
const DATA_TYPES: DataTypeTarget[] = [
  { label: "Date/Time/Timezone", anchor: "date-time-timezone", bare: true },
  { label: "Fixed decimal number", anchor: "fixed-decimal-number", bare: true },
  { label: "True/False", anchor: "true-false", bare: true },
  { label: "Decimal number", anchor: "decimal-number", bare: true },
  { label: "Whole number", anchor: "whole-number", bare: true },
  { label: "Date/Time", anchor: "date-time", bare: true },
  { label: "Percentage", anchor: "percentage", bare: true },
  { label: "datetimezone", anchor: "date-time-timezone", bare: true },
  { label: "datetime", anchor: "date-time", bare: true },
  { label: "Text", anchor: "text", bare: false },
  { label: "Date", anchor: "date", bare: false },
  { label: "Time", anchor: "time", bare: false },
  { label: "Duration", anchor: "duration", bare: false },
  { label: "Binary", anchor: "binary", bare: false },
  { label: "Any", anchor: "any", bare: false },
];

/** M keyword → data-types page anchor (rule B). */
const GENERIC_ANCHORS: Record<string, string> = {
  text: "text",
  date: "date",
  time: "time",
  duration: "duration",
  binary: "binary",
  logical: "true-false",
  number: "decimal-number",
  any: "any",
  currency: "fixed-decimal-number",
  percentage: "percentage",
  datetime: "date-time",
  datetimezone: "date-time-timezone",
};

/* ------------------------------------------------------------------ term tables */

interface Term {
  term: string;
  href: string;
  kind: LinkKind;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const functionTerms: Term[] = functionNames.map((name) => ({
  term: name,
  href: `/function/${encodeURIComponent(name)}`,
  kind: "function",
}));

const memberTerms: Term[] = enumerationMemberNames.map((name) => ({
  term: name,
  href: memberHref(name) as string,
  kind: "enumeration",
}));

const typeTerms: Term[] = enumerations.map((e) => ({
  term: e.name,
  href: enumerationHref(e.slug),
  kind: "enumeration",
}));

const labelTerms: Term[] = DATA_TYPES.filter((t) => t.bare).map((t) => ({
  term: t.label,
  href: `${DATATYPES_PAGE}#${t.anchor}`,
  kind: "datatype",
}));

const allTerms = [...functionTerms, ...memberTerms, ...typeTerms, ...labelTerms];

/** Dotted / "#"-literal terms (functions, constants, X.Type) vs. word-like labels. */
const dottedTerms = allTerms.filter((t) => /[.#]/.test(t.term));
const plainTerms = allTerms.filter((t) => !/[.#]/.test(t.term));

const dottedByLower = new Map<string, Term>(
  dottedTerms.map((t) => [t.term.toLowerCase(), t]),
);
const plainByLower = new Map<string, Term>(
  plainTerms.map((t) => [t.term.toLowerCase(), t]),
);

const BOUND_BEFORE = "(^|[^A-Za-z0-9_#$\\.])";
const BOUND_AFTER = "(?![A-Za-z0-9_])";
/** Word-like labels must not be the head of a longer dotted identifier. */
const BOUND_AFTER_WORD = "(?![A-Za-z0-9_])(?!\\.[A-Za-z0-9_])";

const dottedRe = new RegExp(
  `${BOUND_BEFORE}(${dottedTerms.map((t) => escapeRegExp(t.term)).join("|")})${BOUND_AFTER}`,
  "gi",
);

const plainRe = new RegExp(
  `${BOUND_BEFORE}(${plainTerms.map((t) => escapeRegExp(t.term)).join("|")})${BOUND_AFTER_WORD}`,
  "gi",
);

/* Rule B — type context. */
const KEYWORDS = "(?:as|type|nullable|optional|is)";
const ARTICLES = "(?:a|an|the)";
const GENERIC = Object.keys(GENERIC_ANCHORS).join("|");

const contextRe = new RegExp(
  `${BOUND_BEFORE}((?:${KEYWORDS}|${ARTICLES})\\s+)(${GENERIC})${BOUND_AFTER}`,
  "gi",
);
const bareContextRe = new RegExp(
  `${BOUND_BEFORE}((?:(?:${KEYWORDS}|${ARTICLES})\\s+)?)(${GENERIC})${BOUND_AFTER}`,
  "gi",
);

/** Stock English idioms that would otherwise be mis-read as type names. */
function isIdiom(word: string, after: string): boolean {
  const w = word.toLowerCase();
  if ((w === "number" || w === "percentage") && /^\s+of\b/i.test(after)) return true;
  if (w === "time" && /^\s+zone\b/i.test(after)) return true;
  return false;
}

/* ------------------------------------------------------------------ matching */

/** Run `re` over the not-yet-matched spans of `text`, collecting matches. */
function scanInGaps(
  text: string,
  matches: LinkMatch[],
  re: RegExp,
  handle: (m: RegExpExecArray, base: number) => void,
): void {
  const gaps: Array<[number, number]> = [];
  let cursor = 0;
  for (const m of matches) {
    if (m.start > cursor) gaps.push([cursor, m.start]);
    cursor = Math.max(cursor, m.end);
  }
  if (cursor < text.length) gaps.push([cursor, text.length]);

  for (const [start, end] of gaps) {
    const slice = text.slice(start, end);
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(slice)) !== null) handle(m, start);
  }
}

/**
 * Every linkable span inside plain text — non-overlapping and ordered by start.
 * `inlineCode: true` relaxes rule B so bare type words inside `<code>` link too.
 */
export function findLinks(
  text: string,
  options?: { inlineCode?: boolean },
): LinkMatch[] {
  if (!text) return [];

  const matches: LinkMatch[] = [];

  // Phase A — dotted terms (function names, constants, X.Type).
  if (text.includes(".") || text.includes("#")) {
    dottedRe.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = dottedRe.exec(text)) !== null) {
      const term = dottedByLower.get(m[2].toLowerCase());
      if (!term) continue;
      const start = m.index + m[1].length;
      matches.push({ start, end: start + m[2].length, href: term.href, kind: term.kind });
    }
    matches.sort((a, b) => a.start - b.start);
  }

  // Phase B — word-like data-type labels ("Decimal number", "datetime" …).
  scanInGaps(text, matches, plainRe, (m, base) => {
    const term = plainByLower.get(m[2].toLowerCase());
    if (!term) return;
    const start = base + m.index + m[1].length;
    matches.push({ start, end: start + m[2].length, href: term.href, kind: term.kind });
  });
  matches.sort((a, b) => a.start - b.start);

  // Phase C — data types named in a genuine type context.
  const re = options?.inlineCode ? bareContextRe : contextRe;
  scanInGaps(text, matches, re, (m, base) => {
    const word = m[3];
    const after = text.slice(base + m.index + m[0].length);
    if (isIdiom(word, after)) return;
    const anchor = GENERIC_ANCHORS[word.toLowerCase()];
    if (!anchor) return;
    const start = base + m.index + m[1].length + m[2].length;
    matches.push({
      start,
      end: start + word.length,
      href: `${DATATYPES_PAGE}#${anchor}`,
      kind: "datatype",
    });
  });

  matches.sort((a, b) => a.start - b.start || a.end - b.end);
  return matches;
}

/** Split text into linked / plain segments (React renderer + HTML writer). */
const segmentCache = new Map<string, Segment[]>();
const SEGMENT_CACHE_LIMIT = 1500;

export function segmentText(
  text: string,
  options?: { inlineCode?: boolean },
): Segment[] {
  const key = (options?.inlineCode ? "1" : "0") + "\u0000" + text;
  const cached = segmentCache.get(key);
  if (cached) return cached;

  const matches = findLinks(text, options);
  const segments: Segment[] = [];
  let cursor = 0;
  for (const m of matches) {
    if (m.start > cursor) segments.push({ text: text.slice(cursor, m.start) });
    segments.push({ text: text.slice(m.start, m.end), href: m.href, kind: m.kind });
    cursor = m.end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor) });

  if (segmentCache.size >= SEGMENT_CACHE_LIMIT) segmentCache.clear();
  segmentCache.set(key, segments);
  return segments;
}

/* ------------------------------------------------------------------ HTML pass */

const PROTECTED_TAGS = new Set(["pre", "a", "script", "style", "title", "h1", "svg"]);
const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

export interface HtmlLinkifyOptions {
  /** class="" placed on generated anchors */
  className?: string;
  /** target="" placed on generated anchors (iframes use "_parent") */
  target?: string;
}

const HTML_TAG_RE = /<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>/g;

/**
 * Adds internal links to an HTML string.
 * Text inside protected elements (code blocks, existing links, headings,
 * scripts) is left untouched, so the pass is idempotent.
 */
export function linkifyHtml(
  html: string,
  options: HtmlLinkifyOptions = {},
): string {
  const attrs =
    `${options.className ? ` class="${options.className}"` : ""}` +
    `${options.target ? ` target="${options.target}"` : ""}`;

  const stack: string[] = [];
  const emit = (chunk: string): string => {
    if (!chunk) return chunk;
    if (stack.some((t) => PROTECTED_TAGS.has(t))) return chunk;
    const inlineCode = stack.includes("code");
    let out = "";
    for (const s of segmentText(chunk, { inlineCode })) {
      out += s.href ? `<a href="${s.href}"${attrs}>${s.text}</a>` : s.text;
    }
    return out;
  };

  let out = "";
  let cursor = 0;
  let m: RegExpExecArray | null;

  HTML_TAG_RE.lastIndex = 0;
  while ((m = HTML_TAG_RE.exec(html)) !== null) {
    out += emit(html.slice(cursor, m.index));
    cursor = m.index + m[0].length;

    if (m[0].startsWith("<!--") || m[0].startsWith("<!")) {
      out += m[0];
      continue;
    }

    const closing = m[0][1] === "/";
    const tagName = ((m[0].match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/) || [])[1] || "").toLowerCase();

    if (closing) {
      const idx = stack.lastIndexOf(tagName);
      if (idx !== -1) stack.length = idx;
    } else if (!VOID_TAGS.has(tagName) && !/\/>$/.test(m[0])) {
      stack.push(tagName);
    }
    out += m[0];
  }
  out += emit(html.slice(cursor));

  return out;
}

/**
 * Rewrites absolute powerquery.guide links in static HTML to site-relative
 * paths (so previews and the live site behave identically) and points them at
 * the embedding window instead of the iframe.
 */
export function normalizeInternalHrefs(html: string): string {
  return html.replace(
    /<a\b([^>]*?)href="https:\/\/powerquery\.guide(\/[^"]*)"([^>]*)>/gi,
    (_full, pre: string, path: string, post: string) => {
      const attrs = `${pre}${post}`;
      const target = /\btarget=/i.test(attrs) ? "" : ' target="_parent"';
      return `<a${pre}href="${path}"${target}${post}>`;
    },
  );
}
