import DocsLayout from "@/components/layout/docs-layout";

export default function Services() {
  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">

            {/* HERO */}
            <div className="mb-14 text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                Power Query Data Services
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-ms-gray-secondary">
                Messy spreadsheets, slow Power BI refreshes, or inconsistent
                datasets? We help companies transform raw data into clean,
                structured, analysis-ready datasets using
                <strong> Power Query and modern ETL techniques.</strong>
              </p>

              <div className="mt-8">
                <a
                  href="mailto:sales@powerquery.guide"
                  className="inline-flex items-center gap-2 rounded-lg bg-ms-blue px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-ms-blue-hover"
                >
                  Request Data Consultation
                </a>
              </div>
            </div>

            {/* SERVICES */}
            <section className="doc-section mb-14">
              <div className="section-head mb-5">
                <h2 className="text-2xl font-bold text-ms-gray">
                  Our Services
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="panel overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-ms-gray-border bg-canvas-inset px-5 py-3 sm:px-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-ms-gray-border" aria-hidden="true" />
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
                      Data Cleaning
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-ms-gray-secondary">
                      Remove duplicates, fix inconsistent formats, normalize
                      columns, and prepare your raw datasets for reliable
                      analysis.
                    </p>
                  </div>
                </div>

                <div className="panel overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-ms-gray-border bg-canvas-inset px-5 py-3 sm:px-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-ms-gray-border" aria-hidden="true" />
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
                      Power Query Optimization
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-ms-gray-secondary">
                      Improve slow queries, implement query folding, and design
                      efficient Power Query pipelines for large datasets.
                    </p>
                  </div>
                </div>

                <div className="panel overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-ms-gray-border bg-canvas-inset px-5 py-3 sm:px-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-ms-gray-border" aria-hidden="true" />
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
                      Data Transformation
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-ms-gray-secondary">
                      Convert messy exports from CRMs, ERPs, and spreadsheets
                      into structured tables ready for reporting.
                    </p>
                  </div>
                </div>

                <div className="panel overflow-hidden">
                  <div className="flex items-center gap-2.5 border-b border-ms-gray-border bg-canvas-inset px-5 py-3 sm:px-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-ms-gray-border" aria-hidden="true" />
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
                      Automation
                    </h3>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-sm leading-relaxed text-ms-gray-secondary">
                      Replace repetitive manual data preparation with automated
                      Power Query workflows that update instantly.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* PROCESS */}
            <section className="doc-section mb-14">
              <div className="section-head mb-5">
                <h2 className="text-2xl font-bold text-ms-gray">
                  How It Works
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="rounded-xl border border-ms-blue bg-ms-blue-light p-6 text-center">
                  <div className="mb-2 text-2xl font-bold text-ms-blue">1</div>

                  <h3 className="mb-2 text-lg font-semibold text-ms-gray">
                    Share Your Data
                  </h3>

                  <p className="text-sm text-ms-gray-secondary">
                    Send a sample dataset and describe the challenge you're
                    facing.
                  </p>
                </div>

                <div className="rounded-xl border border-ms-blue bg-ms-blue-light p-6 text-center">
                  <div className="mb-2 text-2xl font-bold text-ms-blue">2</div>

                  <h3 className="mb-2 text-lg font-semibold text-ms-gray">
                    Analysis
                  </h3>

                  <p className="text-sm text-ms-gray-secondary">
                    We analyze the data structure and identify cleaning,
                    transformation, and optimization opportunities.
                  </p>
                </div>

                <div className="rounded-xl border border-ms-blue bg-ms-blue-light p-6 text-center">
                  <div className="mb-2 text-2xl font-bold text-ms-blue">3</div>

                  <h3 className="mb-2 text-lg font-semibold text-ms-gray">
                    Solution Delivery
                  </h3>

                  <p className="text-sm text-ms-gray-secondary">
                    Receive optimized Power Query scripts and clean datasets
                    ready for reporting and analysis.
                  </p>
                </div>

              </div>
            </section>

            {/* WHO IS IT FOR */}
            <section className="doc-section mb-14">
              <div className="section-head mb-5">
                <h2 className="text-2xl font-bold text-ms-gray">
                  Who This Is For
                </h2>
              </div>

              <ul className="max-w-3xl list-disc space-y-2 border-l-2 border-ms-blue/25 pl-5 text-[17px] leading-7 text-ms-gray-secondary">
                <li className="marker:text-ms-blue">Companies working with messy Excel exports</li>
                <li className="marker:text-ms-blue">Teams building Power BI dashboards</li>
                <li className="marker:text-ms-blue">Businesses integrating multiple data sources</li>
                <li className="marker:text-ms-blue">Analysts dealing with slow Power Query refreshes</li>
                <li className="marker:text-ms-blue">Organizations preparing data for reporting pipelines</li>
              </ul>
            </section>

            {/* CALL TO ACTION */}
            <section className="rounded-xl border border-ms-blue bg-ms-blue-light p-8 text-center">

              <h2 className="mb-4 text-2xl font-bold text-ms-gray">
                Need Help With Your Data?
              </h2>

              <p className="mx-auto mb-6 max-w-xl text-[17px] leading-8 text-ms-gray-secondary">
                Share your dataset and describe the problem you're facing.
                We'll help you clean, transform, and automate your data
                workflows using Power Query.
              </p>

              <a
                href="mailto:sales@powerquery.guide"
                className="inline-flex items-center gap-2 rounded-lg bg-ms-blue px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-ms-blue-hover"
              >
                Contact Us
              </a>

            </section>

          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
