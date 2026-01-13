import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import aboutPageImage from "@assets/AboutPagePic_1757154397694.jpg";

export default function About() {
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
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">About Power Query Guide</h1>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed m-0">
                  PowerQuery.guide is a comprehensive digital library and technical reference dedicated to the <strong>Power Query M formula language.</strong> Designed for data analysts and BI developers, this resource simplifies <strong>data mashup</strong> and <strong>ETL processes</strong> by providing a searchable, user-friendly alternative to standard documentation for <strong>Power BI, Microsoft Excel, and Analysis Services.</strong>
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our mission is to democratize advanced <strong>data transformation</strong> by making the <strong>M engine</strong> accessible to everyone. We aim to be the primary bridge between raw data and actionable insights, providing the community with the tools to master <strong>functional programming</strong> in Power Query and automate complex data preparation workflows with confidence.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What You'll Find</h2>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6 space-y-2">
                <li><strong>Comprehensive Function Reference:</strong> Detailed syntax and parameter guides for every <strong>built-in M function.</strong></li>
                <li><strong>Practical M Code Examples:</strong> Real-world snippets for <strong>Table, List, and Record transformations.</strong></li>
                <li><strong>Custom Function Tutorials:</strong> Learn to build reusable <strong>M scripts</strong> to scale your Power BI models.</li>
                <li><strong>Optimized ETL Patterns:</strong> Best practices for <strong>query folding</strong>, performance tuning, and data cleaning.</li>
                <li><strong>Searchable Database:</strong> A high-speed interface to find specific functions faster than official docs.</li>
              </ul>

              {/* About Page Image */}
              <div className="my-10 flex justify-center">
                <img 
                  src={aboutPageImage} 
                  alt="Power Query and M Language Extract, Transform, Load (ETL) process diagram"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Getting Started</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ready to elevate your data skills? Start by browsing our <strong>M Function Categories</strong> or use the search bar to find a specific transformation. If you are new to the language, we recommend exploring our "Basics of M" guides to understand the <strong>let...in</strong> syntax and how the <strong>Power Query engine</strong> evaluates expressions.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Attribution & Community</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                PowerQuery.guide is an independent resource built by the community, for the community. While we are inspired by the official <strong>Microsoft Power Query documentation</strong>, all examples and insights here are curated to provide additional clarity. We encourage you to share these resources; please provide a link back to <strong>PowerQuery.guide</strong> when citing our technical content in your blog posts or reports.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {/* Need Help Section */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Need Help?</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Struggling with an <strong>M syntax error</strong> or optimization? We recommend exploring our categorized library. For community support, the <strong>Power BI Forums</strong> and <strong>Stack Overflow</strong> are invaluable resources for solving common <strong>ETL bottlenecks.</strong>
                  </p>
                </div>

                {/* Contact Us Section */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Have a suggestion, found a bug, or interested in a professional collaboration? We'd love to hear from you.
                  </p>
                  <a 
                    href="mailto:sales@powerquery.guide" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    sales@powerquery.guide
                  </a>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}