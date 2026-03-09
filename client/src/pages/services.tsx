import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default function Services() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 ml-0 lg:ml-[280px] pt-16 px-4 lg:px-0">
          <div className="max-w-5xl mx-auto px-6 py-12">

            {/* HERO */}
            <div className="text-center mb-14">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Power Query Data Services
              </h1>

              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Messy spreadsheets, slow Power BI refreshes, or inconsistent
                datasets? We help companies transform raw data into clean,
                structured, analysis-ready datasets using
                <strong> Power Query and modern ETL techniques.</strong>
              </p>

              <div className="mt-8">
                <a
                  href="mailto:sales@powerquery.guide"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Request Data Consultation
                </a>
              </div>
            </div>

            {/* SERVICES */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                Our Services
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">
                    Data Cleaning
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    Remove duplicates, fix inconsistent formats, normalize
                    columns, and prepare your raw datasets for reliable
                    analysis.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">
                    Power Query Optimization
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    Improve slow queries, implement query folding, and design
                    efficient Power Query pipelines for large datasets.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">
                    Data Transformation
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    Convert messy exports from CRMs, ERPs, and spreadsheets
                    into structured tables ready for reporting.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">
                    Automation
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    Replace repetitive manual data preparation with automated
                    Power Query workflows that update instantly.
                  </p>
                </div>

              </div>
            </section>

            {/* PROCESS */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                How It Works
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-2xl mb-2">1</div>

                  <h3 className="font-semibold mb-2">
                    Share Your Data
                  </h3>

                  <p className="text-sm text-gray-700">
                    Send a sample dataset and describe the challenge you're
                    facing.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-2xl mb-2">2</div>

                  <h3 className="font-semibold mb-2">
                    Analysis
                  </h3>

                  <p className="text-sm text-gray-700">
                    We analyze the data structure and identify cleaning,
                    transformation, and optimization opportunities.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-2xl mb-2">3</div>

                  <h3 className="font-semibold mb-2">
                    Solution Delivery
                  </h3>

                  <p className="text-sm text-gray-700">
                    Receive optimized Power Query scripts and clean datasets
                    ready for reporting and analysis.
                  </p>
                </div>

              </div>
            </section>

            {/* WHO IS IT FOR */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Who This Is For
              </h2>

              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                <li>Companies working with messy Excel exports</li>
                <li>Teams building Power BI dashboards</li>
                <li>Businesses integrating multiple data sources</li>
                <li>Analysts dealing with slow Power Query refreshes</li>
                <li>Organizations preparing data for reporting pipelines</li>
              </ul>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-green-50 border border-green-200 p-8 rounded-lg text-center">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Need Help With Your Data?
              </h2>

              <p className="text-gray-700 mb-6 max-w-xl mx-auto">
                Share your dataset and describe the problem you're facing.
                We'll help you clean, transform, and automate your data
                workflows using Power Query.
              </p>

              <a
                href="mailto:sales@powerquery.guide"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Contact Us
              </a>

            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
