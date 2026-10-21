import { type ReactNode } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import DocsLayout from "@/components/layout/docs-layout";
import { AutoLink } from "@/lib/auto-link";
import {
  enumerationsByGroup,
  enumerationHref,
  getEnumeration,
  memberAnchor,
} from "@/data/enumerations";
import { functionNameSet } from "@/data/function-names";

/**
 * Dedicated page for a single enumeration: what it is, every constant with its
 * value and description, and the functions that accept it.
 * Route: /enumeration/:slug
 */

/** Docs section: white panel with a compact uppercase header bar. */
function Section({
  title,
  children,
  className = "",
  tint = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section className={`panel mb-6 overflow-hidden ${className}`}>
      <div
        className={`flex items-center gap-2.5 border-b border-ms-gray-border px-5 py-3 sm:px-6 ${
          tint ? "bg-ms-blue-light/60" : "bg-canvas-inset"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${tint ? "bg-ms-blue" : "bg-ms-gray-border"}`}
          aria-hidden="true"
        />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
          {title}
        </h2>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const tones = {
    neutral: "border-ms-gray-border bg-ms-gray-light text-ms-gray-secondary",
    accent: "border-ms-blue/30 bg-ms-blue-light text-ms-blue",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export default function EnumerationDetail() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug ?? "");
  const enumeration = getEnumeration(slug);

  /* Land on the constant row when arriving with #<member> (SPA navigation
     renders after the browser's own hash handling). The router performs the
     scroll and adds the .is-target highlight — see App.tsx. */

  if (!enumeration) {
    return (
      <DocsLayout>
        <div className="px-6 pt-8 text-center">
          <h1 className="mt-20 text-2xl font-bold text-ms-gray">
            Enumeration not found
          </h1>
          <Link
            href="/enumerations"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ms-blue hover:text-ms-blue-hover hover:underline"
          >
            ← Back to all enumerations
          </Link>
        </div>
      </DocsLayout>
    );
  }

  const documented = enumeration.functions.filter((name) => functionNameSet.has(name));
  const undocumented = enumeration.functions.filter((name) => !functionNameSet.has(name));
  const siblings = enumerationsByGroup().find((g) => g.group === enumeration.group)!;

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Breadcrumb */}
            <nav className="mb-7" aria-label="Breadcrumb">
              <Link
                href="/enumerations"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-white px-3 py-1.5 text-sm font-medium text-ms-gray-secondary shadow-xs transition-all hover:border-ms-blue/40 hover:text-ms-blue"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to all enumerations
              </Link>
            </nav>

            {/* Header */}
            <header className="panel mb-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-mono text-3xl font-bold tracking-tight text-ms-gray sm:text-4xl">
                  {enumeration.name}
                </h1>
                <span className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2 py-0.5 text-xs font-medium text-ms-blue">
                  {enumeration.group}
                </span>
                <Chip tone="accent">
                  {enumeration.members.length} option
                  {enumeration.members.length === 1 ? "" : "s"}
                </Chip>
              </div>

              <div className="mt-5 max-w-3xl text-lg leading-8 text-ms-gray-secondary">
                <AutoLink>{enumeration.description}</AutoLink>
              </div>
            </header>

            {/* Constants */}
            <Section title="Enumeration Options" tint>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-ms-gray-border bg-canvas-inset">
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ms-gray-secondary">
                        Argument
                      </th>
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ms-gray-secondary">
                        Value
                      </th>
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ms-gray-secondary">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ms-gray-border">
                    {enumeration.members.map((member) => (
                      <tr
                        key={member.name}
                        id={memberAnchor(member.name)}
                        className="enum-member-row scroll-mt-28 align-top transition-colors hover:bg-canvas-inset/60"
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[13px] font-semibold text-ms-gray">
                          {member.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <code className="rounded border border-ms-gray-border bg-canvas-inset px-1.5 py-0.5 font-mono text-xs font-semibold text-ms-gray">
                            {member.value}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-sm leading-relaxed text-ms-gray-secondary">
                          <AutoLink>{member.description}</AutoLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Functions accepting this enumeration */}
            {enumeration.functions.length > 0 && (
              <Section title="Applies to">
                <div className="grid gap-2 sm:grid-cols-2">
                  {documented.map((name) => (
                    <Link
                      key={name}
                      href={`/function/${encodeURIComponent(name)}`}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-ms-gray-border bg-canvas px-3 py-2 font-mono text-[13px] text-ms-gray transition-colors hover:border-ms-blue/40 hover:bg-ms-blue-light/50 hover:text-ms-blue"
                    >
                      <span className="truncate">{name}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ms-gray-border transition-transform group-hover:translate-x-0.5 group-hover:text-ms-blue" />
                    </Link>
                  ))}
                  {undocumented.map((name) => (
                    <span
                      key={name}
                      className="truncate rounded-lg border border-dashed border-ms-gray-border bg-canvas px-3 py-2 font-mono text-[13px] text-ms-gray-secondary"
                      title="Not documented on this site yet"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Microsoft documentation */}
            {enumeration.msdoc && (
              <a
                href={enumeration.msdoc}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-6 flex items-center justify-between gap-3 rounded-xl border border-ms-gray-border bg-card px-5 py-4 text-sm font-medium text-ms-gray-secondary shadow-xs transition-colors hover:border-ms-blue/40 hover:text-ms-blue"
              >
                <span className="inline-flex items-center gap-2.5">
                  <ExternalLink className="h-4 w-4 text-ms-gray-border transition-colors group-hover:text-ms-blue" />
                  Microsoft documentation — {enumeration.name}
                </span>
                <ChevronRight className="h-4 w-4 text-ms-gray-border transition-transform group-hover:translate-x-0.5 group-hover:text-ms-blue" />
              </a>
            )}

            {/* More in this group */}
            <nav className="flex flex-wrap items-center gap-2" aria-label="More enumerations">
              <span className="eyebrow-muted mr-1">{enumeration.group}</span>
              {siblings.items
                .filter((s) => s.slug !== enumeration.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={enumerationHref(s.slug)}
                    className="rounded-md border border-ms-gray-border bg-white px-2 py-1 font-mono text-xs text-ms-gray-secondary transition-colors hover:border-ms-blue/40 hover:text-ms-blue"
                  >
                    {s.name}
                  </Link>
                ))}
            </nav>
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
