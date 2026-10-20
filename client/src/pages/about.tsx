import DocsLayout from "@/components/layout/docs-layout";
import aboutPageImage from "@assets/AboutPagePic_1757154397694.jpg";

export default function About() {
  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Page Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                About Power Query Guide
              </h1>
            </header>

            {/* Intro Callout */}
            <div className="mb-10 rounded-xl border border-ms-blue bg-ms-blue-light p-6">
              <p className="m-0 text-lg leading-relaxed text-ms-gray-secondary">
                PowerQuery.guide is a comprehensive digital library and technical reference dedicated to the <strong>Power Query M formula language.</strong> Designed for data analysts and BI developers, this resource simplifies <strong>data mashup</strong> and <strong>ETL processes</strong> by providing a searchable, user-friendly alternative to standard documentation for <strong>Power BI, Microsoft Excel, and Analysis Services.</strong>
              </p>
            </div>

            {/* Our Mission */}
            <section className="doc-section mb-10">
              <h2 className="text-2xl font-bold text-ms-gray">Our Mission</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                Our mission is to democratize advanced <strong>data transformation</strong> by making the <strong>M engine</strong> accessible to everyone. We aim to be the primary bridge between raw data and actionable insights, providing the community with the tools to master <strong>functional programming</strong> in Power Query and automate complex data preparation workflows with confidence.
              </p>
            </section>

            {/* What You'll Find */}
            <section className="doc-section mb-10">
              <h2 className="text-2xl font-bold text-ms-gray">What You'll Find</h2>
              <ul className="mt-5 max-w-3xl list-disc space-y-2 border-l-2 border-ms-blue/25 pl-5 text-[17px] leading-7 text-ms-gray-secondary">
                <li className="marker:text-ms-blue"><strong>Comprehensive Function Reference:</strong> Detailed syntax and parameter guides for every <strong>built-in M function.</strong></li>
                <li className="marker:text-ms-blue"><strong>Practical M Code Examples:</strong> Real-world snippets for <strong>Table, List, and Record transformations.</strong></li>
                <li className="marker:text-ms-blue"><strong>Custom Function Tutorials:</strong> Learn to build reusable <strong>M scripts</strong> to scale your Power BI models.</li>
                <li className="marker:text-ms-blue"><strong>Optimized ETL Patterns:</strong> Best practices for <strong>query folding</strong>, performance tuning, and data cleaning.</li>
                <li className="marker:text-ms-blue"><strong>Searchable Database:</strong> A high-speed interface to find specific functions faster than official docs.</li>
              </ul>
            </section>

            {/* About Page Image */}
            <div className="my-10 panel p-4 sm:p-6">
              <img
                src={aboutPageImage}
                alt="Power Query and M Language Extract, Transform, Load (ETL) process diagram"
                className="mx-auto h-auto w-full max-w-full rounded-lg"
              />
            </div>

            {/* Getting Started */}
            <section className="doc-section mb-10">
              <h2 className="text-2xl font-bold text-ms-gray">Getting Started</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                Ready to elevate your data skills? Start by browsing our <strong>M Function Categories</strong> or use the search bar to find a specific transformation. If you are new to the language, we recommend exploring our "Basics of M" guides to understand the <strong>let...in</strong> syntax and how the <strong>Power Query engine</strong> evaluates expressions.
              </p>
            </section>

            {/* Attribution & Community */}
            <section className="doc-section mb-10">
              <h2 className="text-2xl font-bold text-ms-gray">Attribution & Community</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                PowerQuery.guide is an independent resource built by the community, for the community. While we are inspired by the official <strong>Microsoft Power Query documentation</strong>, all examples and insights here are curated to provide additional clarity. We encourage you to share these resources; please provide a link back to <strong>PowerQuery.guide</strong> when citing our technical content in your blog posts or reports.
              </p>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Need Help Section */}
              <div className="panel p-6">
                <h3 className="mb-3 text-xl font-semibold text-ms-gray">Need Help?</h3>
                <p className="text-sm leading-relaxed text-ms-gray-secondary">
                  Struggling with an <strong>M syntax error</strong> or optimization? We recommend exploring our categorized library. For community support, the <strong>Power BI Forums</strong> and <strong>Stack Overflow</strong> are invaluable resources for solving common <strong>ETL bottlenecks.</strong>
                </p>
              </div>

              {/* Contact Us Section */}
              <div className="rounded-xl border border-ms-blue bg-ms-blue-light p-6">
                <h3 className="mb-3 text-xl font-semibold text-ms-gray">Contact Us</h3>
                <p className="mb-4 text-sm leading-relaxed text-ms-gray-secondary">
                  Have a suggestion, found a bug, or interested in a professional collaboration? We'd love to hear from you.
                </p>
                <a
                  href="mailto:sales@powerquery.guide"
                  className="inline-flex items-center gap-2 rounded-lg bg-ms-blue px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-ms-blue-hover"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  sales@powerquery.guide
                </a>
              </div>
            </div>

          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
