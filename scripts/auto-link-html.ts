/**
 * Adds internal links to the static HTML content files that are injected into
 * the site (Access.Database function page, blog posts rendered in iframes).
 *
 * The pass is content-preserving: it only wraps function names, enumeration
 * constants and data types that already appear in the copy — nothing is
 * written in, removed or reworded — and it is idempotent (already-linked text
 * and code blocks are skipped), so it can be re-run at any time.
 *
 * Usage:  npx tsx scripts/auto-link-html.ts
 *         npm run link:html
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  linkifyHtml,
  normalizeInternalHrefs,
} from "../client/src/lib/link-rules";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlRoot = resolve(root, "client/public/html");

/** Links open in the embedding window instead of the iframe. */
const LINK_CLASS = "auto-link";
const LINK_TARGET = "_parent";

function collectHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectHtmlFiles(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

let totalAdded = 0;

for (const file of collectHtmlFiles(htmlRoot)) {
  const before = readFileSync(file, "utf8");
  const normalized = normalizeInternalHrefs(before);
  const after = linkifyHtml(normalized, {
    className: LINK_CLASS,
    target: LINK_TARGET,
  });

  const count = (html: string) =>
    (html.match(new RegExp(`<a\\b[^>]*class="${LINK_CLASS}"`, "g")) || []).length;
  const added = count(after) - count(before);

  if (after !== before) {
    writeFileSync(file, after, "utf8");
  }

  totalAdded += Math.max(added, 0);
  console.log(
    `${relative(root, file)}: ${Math.max(added, 0)} link(s)${after === before ? " (unchanged)" : ""}`,
  );
}

console.log(`\n${totalAdded} internal link(s) written.`);
