import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default function Enumerations() {
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
            
            {/* Page Header */}
            <div className="mb-12 border-b border-gray-200 pb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Power Query Enumerations
              </h1>
              <p className="text-lg text-gray-600">
                A practical index of the built-in constants used in M Language.
              </p>
            </div>

            {/* Content Section */}
            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-12">
              
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an Enumeration in M?</h2>
                <p>
                  Enumerations are named constants built into Power Query. Instead of passing arbitrary numbers into your functions, you use these readable names to specify behaviors, making your code easier to maintain and understand.
                </p>
                <p>
                  Click on any enumeration below to visit its dedicated page for detailed examples and use cases.
                </p>
              </section>

              <hr className="border-gray-100" />

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Sorting Orders (Order)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Order.Ascending" className="text-blue-600 hover:underline">Order.Ascending</a>
                        </td>
                        <td className="p-3 text-sm">0</td>
                        <td className="p-3 text-sm">Sorts smallest to largest.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Order.Descending" className="text-blue-600 hover:underline">Order.Descending</a>
                        </td>
                        <td className="p-3 text-sm">1</td>
                        <td className="p-3 text-sm">Sorts largest to smallest.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Join Kinds (JoinKind)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/JoinKind.Inner" className="text-blue-600 hover:underline">JoinKind.Inner</a>
                        </td>
                        <td className="p-3 text-sm">0</td>
                        <td className="p-3 text-sm">Keeps only matching rows.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/JoinKind.LeftOuter" className="text-blue-600 hover:underline">JoinKind.LeftOuter</a>
                        </td>
                        <td className="p-3 text-sm">1</td>
                        <td className="p-3 text-sm">Keeps all left rows.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/JoinKind.RightOuter" className="text-blue-600 hover:underline">JoinKind.RightOuter</a>
                        </td>
                        <td className="p-3 text-sm">2</td>
                        <td className="p-3 text-sm">Keeps all right rows.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/JoinKind.FullOuter" className="text-blue-600 hover:underline">JoinKind.FullOuter</a>
                        </td>
                        <td className="p-3 text-sm">3</td>
                        <td className="p-3 text-sm">Keeps all rows from both.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/JoinKind.LeftAnti" className="text-blue-600 hover:underline">JoinKind.LeftAnti</a>
                        </td>
                        <td className="p-3 text-sm">4</td>
                        <td className="p-3 text-sm">Left rows without matches.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/JoinKind.RightAnti" className="text-blue-600 hover:underline">JoinKind.RightAnti</a>
                        </td>
                        <td className="p-3 text-sm">5</td>
                        <td className="p-3 text-sm">Right rows without matches.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Days of the Week (Day)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Sunday" className="text-blue-600 hover:underline">Day.Sunday</a></td>
                        <td className="p-3 text-sm">0</td><td className="p-3 text-sm">Represents Sunday.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Monday" className="text-blue-600 hover:underline">Day.Monday</a></td>
                        <td className="p-3 text-sm">1</td><td className="p-3 text-sm">Represents Monday.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Tuesday" className="text-blue-600 hover:underline">Day.Tuesday</a></td>
                        <td className="p-3 text-sm">2</td><td className="p-3 text-sm">Represents Tuesday.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Wednesday" className="text-blue-600 hover:underline">Day.Wednesday</a></td>
                        <td className="p-3 text-sm">3</td><td className="p-3 text-sm">Represents Wednesday.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Thursday" className="text-blue-600 hover:underline">Day.Thursday</a></td>
                        <td className="p-3 text-sm">4</td><td className="p-3 text-sm">Represents Thursday.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Friday" className="text-blue-600 hover:underline">Day.Friday</a></td>
                        <td className="p-3 text-sm">5</td><td className="p-3 text-sm">Represents Friday.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium"><a href="/functions/Day.Saturday" className="text-blue-600 hover:underline">Day.Saturday</a></td>
                        <td className="p-3 text-sm">6</td><td className="p-3 text-sm">Represents Saturday.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">4. Rounding Modes (RoundingMode)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/RoundingMode.Up" className="text-blue-600 hover:underline">RoundingMode.Up</a>
                        </td>
                        <td className="p-3 text-sm">0</td>
                        <td className="p-3 text-sm">Rounds up to the next highest number.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/RoundingMode.Down" className="text-blue-600 hover:underline">RoundingMode.Down</a>
                        </td>
                        <td className="p-3 text-sm">1</td>
                        <td className="p-3 text-sm">Rounds down to the next lowest number.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/RoundingMode.AwayFromZero" className="text-blue-600 hover:underline">RoundingMode.AwayFromZero</a>
                        </td>
                        <td className="p-3 text-sm">2</td>
                        <td className="p-3 text-sm">Rounds away from zero.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/RoundingMode.ToEven" className="text-blue-600 hover:underline">RoundingMode.ToEven</a>
                        </td>
                        <td className="p-3 text-sm">3</td>
                        <td className="p-3 text-sm">Banker's rounding (to the nearest even number).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">5. Occurrences (Occurrence)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Occurrence.First" className="text-blue-600 hover:underline">Occurrence.First</a>
                        </td>
                        <td className="p-3 text-sm">0</td>
                        <td className="p-3 text-sm">Targets only the first match.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Occurrence.Last" className="text-blue-600 hover:underline">Occurrence.Last</a>
                        </td>
                        <td className="p-3 text-sm">1</td>
                        <td className="p-3 text-sm">Targets only the last match.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Occurrence.All" className="text-blue-600 hover:underline">Occurrence.All</a>
                        </td>
                        <td className="p-3 text-sm">2</td>
                        <td className="p-3 text-sm">Targets every single match.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Occurrence.Optional" className="text-blue-600 hover:underline">Occurrence.Optional</a>
                        </td>
                        <td className="p-3 text-sm">-</td>
                        <td className="p-3 text-sm">Indicates an optional function parameter.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Occurrence.Required" className="text-blue-600 hover:underline">Occurrence.Required</a>
                        </td>
                        <td className="p-3 text-sm">-</td>
                        <td className="p-3 text-sm">Indicates a required function parameter.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/Occurrence.Repeating" className="text-blue-600 hover:underline">Occurrence.Repeating</a>
                        </td>
                        <td className="p-3 text-sm">-</td>
                        <td className="p-3 text-sm">Indicates a repeating function parameter.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">6. Quote Styles (QuoteStyle)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/QuoteStyle.None" className="text-blue-600 hover:underline">QuoteStyle.None</a>
                        </td>
                        <td className="p-3 text-sm">0</td>
                        <td className="p-3 text-sm">Ignores quotes completely.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/QuoteStyle.Csv" className="text-blue-600 hover:underline">QuoteStyle.Csv</a>
                        </td>
                        <td className="p-3 text-sm">1</td>
                        <td className="p-3 text-sm">Respects CSV quotes to protect delimiters.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">7. Extra Values Handling (ExtraValues)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/ExtraValues.List" className="text-blue-600 hover:underline">ExtraValues.List</a>
                        </td>
                        <td className="p-3 text-sm">0</td>
                        <td className="p-3 text-sm">Groups overflow items into a list.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/ExtraValues.Ignore" className="text-blue-600 hover:underline">ExtraValues.Ignore</a>
                        </td>
                        <td className="p-3 text-sm">1</td>
                        <td className="p-3 text-sm">Silently drops extra values.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/ExtraValues.Error" className="text-blue-600 hover:underline">ExtraValues.Error</a>
                        </td>
                        <td className="p-3 text-sm">2</td>
                        <td className="p-3 text-sm">Returns an error on extra values.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">8. Text Encoding (TextEncoding)</h3>
                <div className="overflow-x-auto my-4 border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 text-sm font-semibold text-gray-900">Enumeration Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Value</th>
                        <th className="p-3 text-sm font-semibold text-gray-900">Brief Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/TextEncoding.Utf8" className="text-blue-600 hover:underline">TextEncoding.Utf8</a>
                        </td>
                        <td className="p-3 text-sm">65001</td>
                        <td className="p-3 text-sm">Standard UTF-8 encoding.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/TextEncoding.Ascii" className="text-blue-600 hover:underline">TextEncoding.Ascii</a>
                        </td>
                        <td className="p-3 text-sm">20127</td>
                        <td className="p-3 text-sm">Standard ASCII encoding.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/TextEncoding.Windows" className="text-blue-600 hover:underline">TextEncoding.Windows</a>
                        </td>
                        <td className="p-3 text-sm">1252</td>
                        <td className="p-3 text-sm">Windows-1252 encoding.</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-mono text-sm font-medium">
                          <a href="/functions/TextEncoding.Utf16" className="text-blue-600 hover:underline">TextEncoding.Utf16</a>
                        </td>
                        <td className="p-3 text-sm">1200</td>
                        <td className="p-3 text-sm">UTF-16 encoding.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}