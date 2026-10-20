import { useQuery } from "@tanstack/react-query";
import DocsLayout from "@/components/layout/docs-layout";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { type Category } from "@shared/schema";
import { AutoLink } from "@/lib/auto-link";
import MLanguageImage from "@assets/HomePagePic_1757154303902.jpg";
import PowerQueryImage from "@assets/HomePowerQuery.jfif";

export default function Home() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: [`${import.meta.env.BASE_URL}categories.json`],
  });

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Page Header */}
            <header className="mb-12">
              <p className="eyebrow mb-3">M Language Reference</p>
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray sm:text-5xl">
                What Is Power Query
              </h1>
              <div className="mt-6 max-w-3xl space-y-5 text-[17px] leading-8 text-ms-gray-secondary">
                <p>
                  Power Query is a data transformation and connectivity tool developed by Microsoft. It is designed to help connect to, combine, and transform data from various sources, making it easier to analyze and visualize data in applications such as Microsoft Excel and Power BI.
                </p>
                <p>With Power Query, you can:</p>
              </div>
              <ul className="mt-5 max-w-3xl list-disc space-y-3 border-l-2 border-ms-blue/25 pl-5 text-[17px] leading-7 text-ms-gray-secondary">
                <li className="marker:text-ms-blue">
                  Connect to a wide range of data sources, including databases, cloud services, files, and web pages.
                </li>
                <li className="marker:text-ms-blue">
                  Transform data by cleaning, reshaping, and enhancing it through a user-friendly interface without the need for complex programming.
                </li>
                <li className="marker:text-ms-blue">
                  Automate data preparation tasks by saving queries, enabling consistent and repeatable workflows.
                </li>
              </ul>
              <p className="mt-6 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                Power Query is especially valuable for business analysts, data professionals, and anyone who needs to handle large amounts of data efficiently. Its intuitive interface, combined with powerful capabilities, simplifies the process of preparing data for meaningful analysis.
              </p>
            </header>

            {/* Power Query Image */}
            <div className="panel mb-14 p-4 sm:p-6">
              <img
                src={PowerQueryImage}
                alt="Power Query workflow diagram showing data transformation process"
                className="mx-auto h-auto w-full max-w-full rounded-lg"
              />
            </div>

            {/* Expressions, values, and let expression */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Expressions, values, and let expression</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                <AutoLink>
                  A Power Query M formula language query is composed of formula expression steps that create a mashup query. A formula expression can be evaluated (computed), yielding a value. The let expression encapsulates a set of values to be computed, assigned names, and then used in a subsequent expression that follows the in statement. For example, a let expression could contain a Source variable that equals the value of Text.Proper and yields a text value in proper case.
                </AutoLink>
              </p>
            </section>


            {/* Comments */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Comments</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                You can add comments to your code with single-line comments // or multi-line comments that begin with /* and end with */.
              </p>
            </section>

            {/* Evaluation Model */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Evaluation Model</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                The evaluation model of the Power Query M formula language is modeled after the evaluation model commonly found in spreadsheets, where the order of calculations can be determined based on dependencies between the formulas in the cells.
              </p>
            </section>

            {/* Operators */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Operators</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                The Power Query M formula language includes a set of operators that can be used in an expression. Operators are applied to operands to form symbolic expressions. For example, in the expression 1 + 2 the numbers 1 and 2 are operands and the operator is the addition operator (+).
              </p>
            </section>

            {/* Types and type conversion */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Types and type conversion</h2>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                Power Query M uses types to classify values to have a more structured data set. This article describes the most commonly-used M types and how to convert one type to another type.
              </p>
            </section>

            {/* Groups Section */}
            <section className="doc-section mb-14">
              <div className="section-head mb-5">
                <h2 className="text-2xl font-bold text-ms-gray">Groups</h2>
                <Link
                  href="/functions"
                  className="group inline-flex items-center gap-1.5 rounded-lg px-1 text-sm font-semibold text-ms-blue transition-colors hover:text-ms-blue-hover"
                >
                  View all groups
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <p className="max-w-3xl text-[17px] leading-8 text-ms-gray-secondary">
                The Power Query M function reference includes articles for each of the over 700 functions. Browse Power Query functions alphabetically from the sidebar or choose a category below:
              </p>

              {/* Function Categories Grid */}
              {isLoading ? (
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-6 w-1/3 rounded bg-gray-200 mb-3"></div>
                      <div className="h-16 rounded bg-gray-100"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {categories?.map((category) => (
                    <div
                      key={category.name}
                      className="function-category group flex flex-col rounded-xl border border-ms-gray-border p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ms-blue-light text-ms-blue shadow-xs">
                          <span className="text-base font-bold">
                            {category.name.charAt(0).toUpperCase()}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-ms-gray-border transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ms-blue" />
                      </div>

                      <h3 className="mt-4 text-lg font-semibold text-ms-blue">
                        <Link
                          href={`/category/${category.name}`}
                          className="transition-colors hover:text-ms-blue-hover"
                        >
                          {category.name.charAt(0).toUpperCase() + category.name.slice(1).replace(/[-_]/g, ' ')} groups
                        </Link>
                      </h3>

                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ms-gray-secondary">
                        <AutoLink>{category.description}</AutoLink>
                      </p>

                      <div className="mt-5">
                        <span className="inline-flex items-center rounded-md border border-ms-gray-border bg-ms-gray-light px-2.5 py-1 text-xs font-semibold tabular-nums text-ms-gray-secondary">
                          {category.functionCount} functions
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Additional M Language Features */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Additional M Language Features</h2>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="panel flex flex-col gap-5 p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-ms-blue">Metadata</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                      Metadata is information about a value that is associated with a value. Metadata is represented as a record value, called a metadata record. The fields of a metadata record can be used to store the metadata for a value.
                    </p>
                  </div>

                  <div className="border-t border-ms-gray-border pt-5">
                    <h3 className="text-lg font-semibold text-ms-blue">Errors</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                      An error in Power Query M formula language is an indication that the process of evaluating an expression could not produce a value. Errors are raised by operators and functions encountering error conditions or by using the error expression.
                    </p>
                  </div>

                  <div className="border-t border-ms-gray-border pt-5">
                    <h3 className="text-lg font-semibold text-ms-blue">Text Formatting</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                      In Power Query, text formatting refers to various transformations and operations that can be applied to text data to modify its appearance or structure.
                    </p>
                  </div>
                </div>

                <div className="panel flex flex-col gap-5 p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-ms-blue">Enumerations</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                      <AutoLink>
                        The M language provides a range of enumerations. These simplify the process of selecting options within a function. For example, you have the option to provide the Date.StartOfWeek function with the first day of the week by writing Day.Monday.
                      </AutoLink>
                    </p>
                  </div>

                  <div className="border-t border-ms-gray-border pt-5">
                    <h3 className="text-lg font-semibold text-ms-blue">Constants</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                      Constant values are values that do not change. The M language supports several and they provide an easy way to input values that are immutable.
                    </p>
                  </div>

                  <div className="border-t border-ms-gray-border pt-5">
                    <h3 className="text-lg font-semibold text-ms-blue">Dynamic Values</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ms-gray-secondary">
                      A dynamic value is a value that takes into account your personal settings, resulting in potentially different values for each user. The M Language offers a limited selection of dynamic values to cater to varying user environments.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates Section */}
            <section className="doc-section mb-14">
              <h2 className="text-2xl font-bold text-ms-gray">Updates</h2>
              <p className="mt-5 text-[17px] leading-8 text-ms-gray-secondary">
                Latest Power Query functions released:
              </p>

              <ol className="relative mt-6 ml-3 space-y-4 border-l-2 border-ms-gray-border pl-6">
                <li className="relative">
                  <span
                    className="absolute -left-[31px] top-5 h-2.5 w-2.5 rounded-full bg-ms-blue ring-4 ring-canvas"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-ms-gray-border bg-white px-4 py-3.5 shadow-xs transition-shadow hover:shadow-sm">
                    <time className="font-mono text-sm text-ms-gray-secondary">2024-09-10:</time>
                    <Link
                      href="/function/AzureStorage.DataLakeContents"
                      className="font-medium text-ms-blue transition-colors hover:text-ms-blue-hover"
                    >
                      AzureStorage.DataLakeContents
                    </Link>
                  </div>
                </li>
                <li className="relative">
                  <span
                    className="absolute -left-[31px] top-5 h-2.5 w-2.5 rounded-full bg-ms-blue ring-4 ring-canvas"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-ms-gray-border bg-white px-4 py-3.5 shadow-xs transition-shadow hover:shadow-sm">
                    <time className="font-mono text-sm text-ms-gray-secondary">2024-08-23:</time>
                    <Link
                      href="/function/Table.CombineColumns"
                      className="font-medium text-ms-blue transition-colors hover:text-ms-blue-hover"
                    >
                      Table.CombineColumns
                    </Link>
                  </div>
                </li>
              </ol>
            </section>

            {/* About This Reference */}
            <section className="doc-section">
              <h2 className="text-2xl font-bold text-ms-gray">About This Reference</h2>
              <div className="mt-5 max-w-3xl space-y-4 text-[17px] leading-8 text-ms-gray-secondary">
                <p>
                  This Power Query reference contains information on the M language. The Guide is updated regularly to reflect the latest changes in Microsoft products. Each M function is presented with a syntax, supporting articles and often with examples.
                </p>
                <p>
                  While this Power Query Guide is a BI Gorilla project created and maintained by Rick de Groot, it also incorporates official Microsoft documentation to provide you with the most accurate and up-to-date information. It also took inspiration from the dax.guide website that does something similar for the DAX language.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
