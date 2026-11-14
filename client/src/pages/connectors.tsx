import DocsLayout from "@/components/layout/docs-layout";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  BarChart3,
  Briefcase,
  ChevronRight,
  Cloud,
  Database,
  FolderOpen,
  Puzzle,
  Server,
  type LucideIcon,
} from "lucide-react";
import { type Function } from "@shared/schema";
import {
  connectorGuides,
  connectorCatalogGroups,
  connectorEntryHref,
  connectorGuideForFunction,
} from "@/data/connectors";

/** Standard icon per catalog group — one glyph family, one place. */
const GROUP_ICONS: Record<string, LucideIcon> = {
  Databases: Database,
  "Cloud Storage": Cloud,
  "Azure & Fabric": Server,
  "Power Platform": Puzzle,
  "SaaS & Business Apps": Briefcase,
  "Analytics & BI": BarChart3,
  "Files & Web": FolderOpen,
};

/**
 * Connectors index — the complete catalog of connector entry functions
 * documented on the site (audited from functions.json), grouped by the
 * kind of source they reach, with one icon per group.
 *
 * Cards are deduplicated by their target href: when several entry
 * functions share one practical guide (SharePoint family, Sql family,
 * Web family, …) they render a single guide card titled with the
 * connector's product name. Everything else keeps its function card and
 * links to the auto-parsed /function/<name> reference. Every card
 * therefore routes to the guide first, reference second.
 */
export default function Connectors() {
  const { data: allFunctions, isLoading } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const availableNames = new Set((allFunctions ?? []).map((f) => f.name));
  const fnByName = new Map((allFunctions ?? []).map((f) => [f.name, f]));
  const totalConnectors = connectorCatalogGroups.reduce(
    (total, group) =>
      total + group.names.filter((name) => availableNames.has(name)).length,
    0,
  );

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Page Header */}
            <header className="border-b border-ms-gray-border pb-8">
              <p className="eyebrow mb-3">M Language Reference</p>
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                Power Query Connectors
              </h1>
              <p className="mt-3 text-lg text-ms-gray-secondary">
                Connect, filter and extract — every connector documented
                here, grouped by what it connects to.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2.5 py-1 text-xs font-semibold text-ms-blue">
                  {connectorGuides.length} guides
                </span>
                <span className="rounded-md border border-ms-gray-border bg-canvas-inset px-2.5 py-1 text-xs font-semibold text-ms-gray-secondary">
                  {isLoading ? "loading…" : `${totalConnectors} connectors`}
                </span>
              </div>
            </header>

            {/* Intro */}
            <section className="doc-section mt-9 mb-12">
              <div className="panel p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-ms-gray">
                  Guides vs. Function Reference
                </h2>
                <p className="mt-4 text-[17px] leading-8 text-ms-gray-secondary">
                  Every connector ships with an entry function — the door
                  Power Query walks through to reach the service. Each card
                  below opens the{" "}
                  <strong className="font-semibold text-ms-gray">
                    practical guide
                  </strong>{" "}
                  where one exists: what to set up before you connect, what
                  the connector can and cannot do, and working queries you
                  can adapt to your own data. The tabs at the top of every
                  guide flip to the{" "}
                  <Link href="/functions" className="auto-link">
                    M code reference
                  </Link>{" "}
                  for exact signatures and parameters — and back. Connectors
                  without a guide link straight to their reference page.
                </p>
              </div>
            </section>

            {/* Full catalog — every connector entry point on the site */}
            <section className="doc-section mb-11">
              <div className="section-head mb-4">
                <h2 className="text-2xl font-bold text-ms-gray">
                  All Connectors
                </h2>
                <span className="eyebrow-muted">
                  {isLoading
                    ? "loading…"
                    : `${totalConnectors} entry point${totalConnectors === 1 ? "" : "s"}`}
                </span>
              </div>

              {isLoading ? (
                <div className="panel p-6 text-sm text-ms-gray-secondary">
                  Loading connectors…
                </div>
              ) : (
                connectorCatalogGroups.map((group) => {
                  const names = group.names.filter((name) =>
                    availableNames.has(name),
                  );
                  if (names.length === 0) return null;

                  const Icon = GROUP_ICONS[group.label] ?? Database;

                  /* One card per unique target href: sibling functions that
                     share a practical guide collapse into that guide's card. */
                  const seen = new Set<string>();
                  const cards = names
                    .map((name) => {
                      const href = connectorEntryHref(name);
                      if (seen.has(href)) return null;
                      seen.add(href);
                      return { name, href };
                    })
                    .filter((card): card is { name: string; href: string } =>
                      Boolean(card),
                    );

                  return (
                    <div key={group.label} className="mb-9 last:mb-0">
                      <div className="section-head mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ms-blue/30 bg-ms-blue-light text-ms-blue"
                            aria-hidden="true"
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <h3 className="text-lg font-bold text-ms-gray">
                            {group.label}
                          </h3>
                        </div>
                        <span className="eyebrow-muted">
                          {cards.length} card{cards.length === 1 ? "" : "s"}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-ms-gray-secondary">
                        {group.description}
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {cards.map(({ name, href }) => {
                          const guide = connectorGuideForFunction(name);
                          const fn = fnByName.get(name);
                          const title = guide ? guide.name : name;
                          const blurb = guide ? guide.tagline : fn?.description;

                          return (
                            <Link
                              key={href}
                              href={href}
                              className="card-link group flex items-start gap-3 rounded-xl border border-ms-gray-border bg-card p-5"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4
                                    className={
                                      guide
                                        ? "text-[15px] font-bold text-ms-gray transition-colors group-hover:text-ms-blue"
                                        : "font-mono text-[14px] font-semibold text-ms-gray transition-colors group-hover:text-ms-blue"
                                    }
                                  >
                                    {title}
                                  </h4>
                                  {guide && (
                                    <span className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-1.5 py-0.5 text-[10px] font-semibold text-ms-blue">
                                      Guide
                                    </span>
                                  )}
                                </div>

                                {blurb && (
                                  <p className="mt-1.5 line-clamp-3 text-[13px] leading-6 text-ms-gray-secondary">
                                    {blurb}
                                  </p>
                                )}

                                {guide && (
                                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                                    {guide.functions.map((fnName) => (
                                      <span
                                        key={fnName}
                                        className="rounded border border-ms-gray-border bg-canvas-inset px-1.5 py-0.5 font-mono text-[11px] text-ms-gray-secondary"
                                      >
                                        {fnName}
                                      </span>
                                    ))}
                                    {guide.products.map((product) => (
                                      <span
                                        key={product}
                                        className="rounded border border-ms-gray-border bg-canvas px-1.5 py-0.5 text-[11px] text-ms-gray-secondary"
                                      >
                                        {product}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ms-gray-border transition-all group-hover:translate-x-0.5 group-hover:text-ms-blue" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
