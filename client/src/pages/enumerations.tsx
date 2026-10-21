import DocsLayout from "@/components/layout/docs-layout";
import { enumerationsByGroup, enumerationHref } from "@/data/enumerations";
import { ChevronRight } from "lucide-react";

/**
 * Catalog of every Power Query M enumeration (all 32, grouped exactly as the
 * reference index groups them). Every row links to its dedicated page at
 * /enumeration/<slug>, which documents the constants, their values and the
 * functions that accept them.
 */
export default function Enumerations() {
  const groups = enumerationsByGroup();

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Page Header */}
            <header className="border-b border-ms-gray-border pb-8">
              <p className="eyebrow mb-3">M Language Reference</p>
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                Power Query Enumerations
              </h1>
              <p className="mt-3 text-lg text-ms-gray-secondary">
                A practical index of the built-in constants used in M Language.
              </p>
            </header>

            {/* Intro */}
            <section className="doc-section mt-9 mb-12">
              <div className="panel p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-ms-gray">
                  What is an Enumeration in M?
                </h2>
                <p className="mt-4 text-[17px] leading-8 text-ms-gray-secondary">
                  Enumerations are named constants built into Power Query.
                  Instead of passing arbitrary numbers into your functions, you
                  use these readable names to specify behaviors, making your
                  code easier to maintain and understand.
                </p>
                <p className="mt-4 text-[17px] leading-8 text-ms-gray-secondary">
                  Click on any enumeration below to visit its dedicated page
                  for detailed examples and use cases.
                </p>
              </div>
            </section>

            {/* Catalog — one section per group */}
            {groups.map(({ group, items }) => (
              <section key={group} className="doc-section mb-11">
                <div className="section-head mb-4">
                  <h2 className="text-2xl font-bold text-ms-gray">{group}</h2>
                  <span className="eyebrow-muted">
                    {items.length} enumeration{items.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="grid gap-4">
                  {items.map((enumeration) => (
                    <a
                      key={enumeration.slug}
                      href={enumerationHref(enumeration.slug)}
                      className="card-link group flex items-start gap-4 rounded-xl border border-ms-gray-border bg-card p-5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-mono text-[15px] font-bold text-ms-gray transition-colors group-hover:text-ms-blue">
                            {enumeration.name}
                          </h3>
                          <span className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2 py-0.5 text-[11px] font-semibold text-ms-blue">
                            {enumeration.members.length} option
                            {enumeration.members.length === 1 ? "" : "s"}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                          {enumeration.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {enumeration.members.map((member) => (
                            <span
                              key={member.name}
                              className="rounded border border-ms-gray-border bg-canvas-inset px-1.5 py-0.5 font-mono text-[11px] text-ms-gray-secondary"
                            >
                              {member.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ms-gray-border transition-all group-hover:translate-x-0.5 group-hover:text-ms-blue" />
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
