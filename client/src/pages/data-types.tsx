import DocsLayout from "@/components/layout/docs-layout";
import { AutoLink } from "@/lib/auto-link";

export default function DataTypes() {

  const dataTypes = [
    {
      name: "Text",
      icon: "📝",
      description: "Stores character sequences using Unicode encoding. This includes alphanumeric characters, symbols, and dates formatted as text. Can hold up to 268,435,456 Unicode characters, with each character occupying 2 bytes, totaling 536,870,912 bytes maximum capacity."
    },
    {
      name: "True/False",
      icon: "✓",
      description: "Binary logical data type that stores boolean values - either True or False."
    },
    {
      name: "Decimal number",
      icon: "1.2",
      description: "An 8-byte floating-point numeric format that serves as the primary number type for most calculations. Handles both fractional and whole numbers effectively. Value range spans from –1.79E +308 to –2.23E –308 for negatives, includes zero, and 2.23E –308 to 1.79E + 308 for positives. Examples include 34, 34.01, and 34.000367063. Maximum precision extends to 15 digits, with flexible decimal point placement. Functions similarly to Excel's numeric storage system."
    },
    {
      name: "Fixed decimal number",
      icon: "$",
      description: "Currency-oriented data type with a predetermined decimal point position. Maintains exactly four decimal places and supports up to 19 significant digits. Maximum representable value reaches 922,337,203,685,477.5807 in either direction. Provides exact precision unlike floating-point numbers, making it ideal for financial calculations where accuracy is critical."
    },
    {
      name: "Whole number",
      icon: "123",
      description: "An 8-byte integer format that exclusively stores whole numbers without decimal components. Accommodates up to 19 digits within the range of –9,223,372,036,854,775,807 (–2^63+1) to 9,223,372,036,854,775,806 (2^63–2). Offers maximum precision among numeric types and provides exact control over rounding behavior."
    },
    {
      name: "Percentage",
      icon: "%",
      description: "Essentially identical to Decimal Number in storage but applies percentage formatting for display purposes within the Power Query Editor interface."
    },
    {
      name: "Date/Time",
      icon: "📅",
      description: "Combined date and time storage using decimal number foundation for internal representation. Time components use fractional values based on 1/300 second intervals (3.33 millisecond precision). Supports dates within the 1900-9999 year range and allows conversion to decimal format."
    },
    {
      name: "Date",
      icon: "📆",
      description: "Date-only storage without time information. Internally equivalent to Date/Time format with zero fractional component when processed by the data model."
    },
    {
      name: "Time",
      icon: "🕐",
      description: "Time-only storage without date information. Internally matches Date/Time format with zero integer component when processed by the data model."
    },
    {
      name: "Date/Time/Timezone",
      icon: "🌍",
      description: "UTC-based date and time storage that includes timezone offset information. Automatically converts to standard Date/Time format during model loading."
    },
    {
      name: "Duration",
      icon: "⏱️",
      description: "Time span representation that converts to decimal format in the data model. Supports arithmetic operations with Date/Time fields for accurate calculations. Works effectively in visualizations due to its decimal number foundation."
    },
    {
      name: "Binary",
      icon: "💾",
      description: "Universal data type for storing information in binary format, accommodating various file types and encoded data structures."
    },
    {
      name: "Any",
      icon: "❓",
      description: "Default classification for columns lacking specific data type assignments. Serves as a universal container for all value types. Best practice recommends explicit type definition for unstructured data sources and avoiding Any type in final query outputs."
    }
  ];

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: "Power Query employs data types to organize and structure information within datasets. These classifications are applied at the column level, ensuring all values within a field adhere to the specified type requirements."
    },
    {
      id: "detection",
      title: "Data Type Detection",
      content: "Automatic type identification happens when connecting to structured databases through schema reading, while unstructured sources like Excel files, CSV documents, and text files undergo value inspection for type determination."
    },
    {
      id: "definition",
      title: "How to Define a Column Data Type",
      content: "Column data types can be modified through multiple interface locations: Home tab's Transform section, Transform tab's Any column area, column header icon selection, or right-click context menu's Change Type option."
    },
    {
      id: "locale",
      title: "Document or Project Locale",
      content: "Power Query manages both display language (localization) and value formatting standards (globalization). Locale settings determine how text values are interpreted and converted between different data types."
    }
  ];

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Page Header */}
            <header className="border-b border-ms-gray-border pb-8">
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                Data Types in Power Query
              </h1>
              <p className="mt-3 text-lg text-ms-gray-secondary">
                <AutoLink>
                  Power Query employs data types to organize and structure information within datasets. 
                  These classifications are applied at the column level, ensuring all values within a field adhere to the specified type requirements.
                </AutoLink>
              </p>
            </header>

            {/* Table of Contents */}
            <section className="panel mb-10 mt-9 overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-ms-gray-border bg-canvas-inset px-5 py-3 sm:px-6">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-ms-gray-border"
                  aria-hidden="true"
                />
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
                  Table of Contents
                </h2>
              </div>
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-ms-blue">Sections</h3>
                    <ul className="space-y-2">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a 
                            href={`#${section.id}`} 
                            className="text-ms-blue hover:text-ms-blue-hover hover:underline"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-ms-blue">Quick Access</h3>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="#data-types-table" 
                          className="text-ms-blue hover:text-ms-blue-hover hover:underline"
                        >
                          Complete Data Types Reference
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#best-practices" 
                          className="text-ms-blue hover:text-ms-blue-hover hover:underline"
                        >
                          Best Practices
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Overview Section */}
            <section id="overview" className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">Overview</h2>
              <div className="mt-5 space-y-5">
                <p className="text-[17px] leading-8 text-ms-gray-secondary">
                  <AutoLink>
                    Power Query employs data types to organize and structure information within datasets. 
                    These classifications are applied at the column level, ensuring all values within a field adhere to the specified type requirements.
                  </AutoLink>
                </p>
                <p className="text-[17px] leading-8 text-ms-gray-secondary">
                  <AutoLink>
                    Column data types are visually indicated through icons positioned at the left side of each column header, providing immediate type identification.
                  </AutoLink>
                </p>
                <div className="border-l-4 border-l-ms-blue bg-ms-blue-light p-4">
                  <p className="text-[17px] leading-8 text-ms-gray">
                    <strong>Important:</strong> Power Query delivers type-specific transformation tools and options that adapt to each column's data type. 
                    When working with Date columns, for instance, you'll access date-specific operations and filters. 
                    These contextual features appear across the interface, including Transform tabs, Add column sections, and filtering mechanisms.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Types Reference Table */}
            <section id="data-types-table" className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">Complete Data Types Reference</h2>
              <div className="mt-5 grid gap-5">
                {dataTypes.map((dataType, index) => (
                  <div 
                    key={index} 
                    id={dataType.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                    className="panel scroll-mt-20 overflow-hidden border-l-4 border-l-ms-blue"
                  >
                    <div className="flex items-center gap-3 border-b border-ms-gray-border bg-canvas-inset px-5 py-3 sm:px-6">
                      <span className="text-2xl">{dataType.icon}</span>
                      <h3 className="text-lg font-semibold text-ms-blue">{dataType.name}</h3>
                    </div>
                    <div className="p-5 sm:p-6">
                      <p className="text-[17px] leading-8 text-ms-gray-secondary">
                        <AutoLink>{dataType.description}</AutoLink>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="my-12 border-t border-ms-gray-border" />

            {/* Data Type Detection */}
            <section id="detection" className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">Data Type Detection</h2>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  Automatic type identification operates differently based on your data source:
                </AutoLink>
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="panel p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-ms-blue">Structured Data Sources</h3>
                  <p className="mt-2 text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Including databases and similar sources where Power Query extracts schema information directly, 
                      automatically applying appropriate types to each column based on the source definition.
                    </AutoLink>
                  </p>
                </div>
                <div className="panel p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-ms-blue">Unstructured Sources</h3>
                  <p className="mt-2 text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Including Excel workbooks, CSV files, and text documents where Power Query analyzes 
                      content patterns to determine appropriate types. This automatic detection is enabled by default for such sources.
                    </AutoLink>
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                Manual type detection is available through the <strong>Detect data type</strong> feature located in the 
                <strong>Any column</strong> section of the <strong>Transform</strong> ribbon for on-demand type assignment.
              </p>
            </section>

            {/* How to Define Column Data Type */}
            <section id="definition" className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">How to Define a Column Data Type</h2>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  Column data types can be modified through multiple interface locations:
                </AutoLink>
              </p>
              <div className="mt-5 grid gap-4">
                <div className="panel flex items-start gap-3 p-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ms-blue/30 bg-ms-blue-light text-xs font-semibold text-ms-blue">1</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ms-blue">Home Tab</h3>
                    <p className="mt-1 text-[17px] leading-8 text-ms-gray-secondary">
                      <AutoLink>
                        Access the Data type dropdown within the Transform section of the Home ribbon.
                      </AutoLink>
                    </p>
                  </div>
                </div>
                <div className="panel flex items-start gap-3 p-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ms-blue/30 bg-ms-blue-light text-xs font-semibold text-ms-blue">2</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ms-blue">Transform Tab</h3>
                    <p className="mt-1 text-[17px] leading-8 text-ms-gray-secondary">
                      <AutoLink>
                        Use the Data type dropdown located in the Any column section of the Transform ribbon.
                      </AutoLink>
                    </p>
                  </div>
                </div>
                <div className="panel flex items-start gap-3 p-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ms-blue/30 bg-ms-blue-light text-xs font-semibold text-ms-blue">3</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ms-blue">Column Header Icon</h3>
                    <p className="mt-1 text-[17px] leading-8 text-ms-gray-secondary">
                      <AutoLink>
                        Click directly on the type icon positioned at the left side of any column header.
                      </AutoLink>
                    </p>
                  </div>
                </div>
                <div className="panel flex items-start gap-3 p-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ms-blue/30 bg-ms-blue-light text-xs font-semibold text-ms-blue">4</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ms-blue">Context Menu</h3>
                    <p className="mt-1 text-[17px] leading-8 text-ms-gray-secondary">
                      <AutoLink>
                        Right-click on any column and select Change Type from the context menu.
                      </AutoLink>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Automatic Detection Settings */}
            <section className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">Automatic Detection of Column Data Type and Headers</h2>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  This feature targets unstructured data sources by analyzing the initial 200 rows to identify 
                  appropriate column types and header structures. When activated, Power Query automatically implements 
                  two transformation steps in your query:
                </AutoLink>
              </p>
              <ul className="mt-5 list-disc list-inside space-y-2 text-[17px] leading-8 text-ms-gray-secondary marker:text-ms-blue">
                <li><strong>Header promotion:</strong> Elevates the first data row to serve as column headers.</li>
                <li><strong>Type conversion:</strong> Transforms values from generic Any type to specific types based on content analysis.</li>
              </ul>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  This functionality is active by default and can be customized in both Power Query Online and Desktop versions 
                  through the Options interface within Data load configuration.
                </AutoLink>
              </p>
            </section>

            {/* Document or Project Locale */}
            <section id="locale" className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">Document or Project Locale</h2>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  Power Query manages two essential aspects that control presentation and data interpretation:
                </AutoLink>
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="panel p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-ms-blue">Localization</h3>
                  <p className="mt-2 text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Determines the display language and interface elements used throughout Power Query.
                    </AutoLink>
                  </p>
                </div>
                <div className="panel p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-ms-blue">Globalization</h3>
                  <p className="mt-2 text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Controls value formatting standards and governs how textual information is interpreted and processed.
                    </AutoLink>
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <strong>Locale</strong> combines both elements into a unified setting that guides text interpretation and type conversion. 
                For instance, <strong>English (United States)</strong> locale establishes US English for interface display and applies 
                American formatting conventions for value processing.
              </p>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  During type definition or conversion operations, Power Query relies on locale settings to properly 
                  interpret source values before applying transformations to target data types.
                </AutoLink>
              </p>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="doc-section mb-12">
              <h2 className="text-2xl font-bold text-ms-gray">Best Practices</h2>
              <div className="mt-5 grid gap-4">
                <div className="panel border-l-4 border-l-green-500 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-ms-blue">✓ Establish Clear Type Definitions</h3>
                  <p className="text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Always specify explicit data types for columns when working with unstructured data sources to ensure consistent data processing.
                    </AutoLink>
                  </p>
                </div>
                <div className="panel border-l-4 border-l-yellow-500 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-yellow-700">⚠ Eliminate Generic Types</h3>
                  <p className="text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Prevent using Any data type in final query outputs, as undefined types can cause unpredictable results and processing errors.
                    </AutoLink>
                  </p>
                </div>
                <div className="panel border-l-4 border-l-blue-500 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-ms-blue">💡 Select Precision-Appropriate Types</h3>
                  <p className="text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Utilize Fixed Decimal Number or Whole Number formats when exact calculations are required and floating-point approximations must be avoided.
                    </AutoLink>
                  </p>
                </div>
                <div className="panel border-l-4 border-l-purple-500 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-purple-700">🔧 Optimize Detection Configuration</h3>
                  <p className="text-[17px] leading-8 text-ms-gray-secondary">
                    <AutoLink>
                      Adjust automatic type detection settings to match your specific workflow requirements, particularly when processing diverse unstructured data.
                    </AutoLink>
                  </p>
                </div>
              </div>
            </section>


          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
