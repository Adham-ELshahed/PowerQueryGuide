import DocsLayout from "@/components/layout/docs-layout";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { connectorGuides, connectorHref } from "@/data/connectors";

/**
 * Catalog of every connector guide. Each card links to a practical guide at
 * /connectors/<slug>, which pairs the connector's story (prerequisites,
 * capabilities, limitations, recipes) with its auto-parsed function
 * reference page.
 */
export default function Connectors() {
  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Page Header */}
            <header className="border-b border-ms-gray-border pb-8">
              <p className="eyebrow mb-3">M Language Reference</p>
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                Connector Guides
              </h1>
              <p className="mt-3 text-lg text-ms-gray-secondary">
                Connect, filter and extract — practical guides for the data
                sources you use from Power Query.
              </p>
            </header>

            {/* Intro */}
            <section className="doc-section mt-9 mb-12">
              <div className="panel p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-ms-gray">
                  Guides vs. Function Reference
                </h2>
                <p className="mt-4 text-[17px] leading-8 text-ms-gray-secondary">
                  Every connector ships with an entry function — the door
                  Power Query walks through to reach the service. Our{" "}
                  <Link href="/functions" className="auto-link">
                    function reference
                  </Link>{" "}
                  documents each function's syntax and parameters. These
                  guides go one step further: what to set up before you
                  connect, what the connector can and cannot do, and working
                  queries you can adapt to your own data.
                </p>
              </div>
            </section>

            {/* Catalog */}
            <section className="doc-section mb-11">
              <div className="section-head mb-4">
                <h2 className="text-2xl font-bold text-ms-gray">
                  Available Guides
                </h2>
                <span className="eyebrow-muted">
                  {connectorGuides.length} connector
                  {connectorGuides.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="grid gap-4">
                {connectorGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={connectorHref(guide.slug)}
                    className="card-link group flex items-start gap-4 rounded-xl border border-ms-gray-border bg-card p-5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-[15px] font-bold text-ms-gray transition-colors group-hover:text-ms-blue">
                          {guide.name}
                        </h3>
                        {guide.capabilities.map((mode) => (
                          <span
                            key={mode}
                            className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2 py-0.5 text-[11px] font-semibold text-ms-blue"
                          >
                            {mode}
                          </span>
                        ))}
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                        {guide.tagline}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {guide.functions.map((name) => (
                          <span
                            key={name}
                            className="rounded border border-ms-gray-border bg-canvas-inset px-1.5 py-0.5 font-mono text-[11px] text-ms-gray-secondary"
                          >
                            {name}
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
                    </div>

                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ms-gray-border transition-all group-hover:translate-x-0.5 group-hover:text-ms-blue" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
