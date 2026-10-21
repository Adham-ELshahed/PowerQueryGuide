import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useEffect, useState } from "react";
import DocsLayout from "@/components/layout/docs-layout";
import { ArrowLeft, ArrowUpRight, ChevronRight, Layers, LayoutGrid, List } from "lucide-react";
import { type Function, type Category } from "@shared/schema";
import { AutoLink } from "@/lib/auto-link";

type ViewMode = "list" | "grid";

/** Shared with the functions index so the preference follows you around */
const VIEW_KEY = "functions-view";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const categoryName = decodeURIComponent(params.category ?? "");

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin + import.meta.env.BASE_URL
      : "";

  const { data: categories, isLoading: loadingCategories } =
    useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await fetch(
          `${import.meta.env.BASE_URL}categories.json`
        );
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      },
    });

  const { data: allFunctions, isLoading: loadingFunctions } =
    useQuery<Function[]>({
      queryKey: ["functions"],
      queryFn: async () => {
        const res = await fetch(
          `${import.meta.env.BASE_URL}functions.json`
        );
        if (!res.ok) throw new Error("Failed to load functions");
        return res.json();
      },
    });

  const isLoading = loadingCategories || loadingFunctions;

  const categoryData = categories?.find(
    (c) => c.name.toLowerCase() === categoryName.toLowerCase()
  );

  const functions = allFunctions?.filter(
    (f) => f.category.toLowerCase() === categoryName.toLowerCase()
  );

  const categoryDisplayName = categoryData
    ? `${categoryData.name} functions`
    : "Category";

  const [view, setView] = useState<ViewMode>("list");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(VIEW_KEY) as ViewMode | null;
      if (saved === "list" || saved === "grid") setView(saved);
    }
  }, []);

  const changeView = (next: ViewMode) => {
    setView(next);
    if (typeof window !== "undefined") localStorage.setItem(VIEW_KEY, next);
  };

  const viewButtonClasses = (active: boolean) =>
    `flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
      active
        ? "bg-white text-ms-blue shadow-xs ring-1 ring-black/5"
        : "text-ms-gray-secondary hover:text-ms-gray"
    }`;

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Breadcrumb */}
            <nav className="mb-7" aria-label="Breadcrumb">
              <a
                href={`${baseUrl}functions`}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-white px-3 py-1.5 text-sm font-medium text-ms-gray-secondary shadow-xs transition-all hover:border-ms-blue/40 hover:text-ms-blue"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Functions
              </a>
            </nav>

            {/* Category header */}
            <header className="panel mb-6 overflow-hidden">
              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ms-blue-light text-ms-blue shadow-xs">
                  <Layers className="h-6 w-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="eyebrow mb-2">Category</p>
                  <h1 className="text-3xl font-bold tracking-tight text-ms-gray sm:text-4xl">
                    {categoryDisplayName}
                  </h1>
                  {categoryData && (
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-ms-gray-secondary">
                      <AutoLink>{categoryData.description}</AutoLink>
                    </p>
                  )}
                </div>

                <div className="shrink-0 sm:text-right">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-ms-gray-border bg-ms-gray-light px-3 py-1.5 text-xs font-semibold tabular-nums text-ms-gray-secondary">
                    {isLoading ? "Loading..." : `${functions?.length ?? 0} functions in this category`}
                  </span>
                </div>
              </div>
            </header>

            {/* Function list */}
            {isLoading ? (
              <div className="panel animate-pulse overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-ms-gray-border px-6 py-5 last:border-b-0"
                  >
                    <div className="h-4 w-1/4 rounded bg-gray-200" />
                    <div className="mt-3 h-3.5 w-2/3 rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            ) : functions && functions.length > 0 ? (
              <>
                {/* View switch */}
                <div className="mb-4 flex justify-end">
                  <div
                    className="flex gap-1 rounded-xl border border-ms-gray-border bg-ms-gray-light p-1 shadow-xs"
                    role="group"
                    aria-label="Change result layout"
                  >
                    <button
                      type="button"
                      aria-pressed={view === "list"}
                      aria-label="List view"
                      onClick={() => changeView("list")}
                      className={viewButtonClasses(view === "list")}
                    >
                      <List className="h-3.5 w-3.5" />
                      List
                    </button>
                    <button
                      type="button"
                      aria-pressed={view === "grid"}
                      aria-label="Grid view"
                      onClick={() => changeView("grid")}
                      className={viewButtonClasses(view === "grid")}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      Grid
                    </button>
                  </div>
                </div>

                {view === "list" ? (
                  <div className="panel overflow-hidden">
                    <div className="hidden bg-ms-gray-light px-6 py-3 sm:grid sm:grid-cols-12 sm:gap-6 text-[11px] font-semibold uppercase tracking-wider text-ms-gray-secondary">
                      <div className="col-span-5">Function Name</div>
                      <div className="col-span-7">Description</div>
                    </div>
                    <div className="divide-y divide-ms-gray-border">
                      {functions.map((func, index) => (
                        <div
                          key={`${func.name}-${index}`}
                          className="list-row grid grid-cols-1 gap-1.5 px-6 py-4 sm:grid-cols-12 sm:gap-6"
                        >
                          <div className="sm:col-span-5">
                            <a
                              href={`${baseUrl}function/${encodeURIComponent(func.name)}`}
                              className="group/name inline-flex items-start gap-1 font-mono text-[13.5px] font-medium leading-6 text-ms-blue transition-colors hover:text-ms-blue-hover"
                            >
                              <span className="break-words">{func.name}</span>
                              <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/name:opacity-100" />
                            </a>
                          </div>
                          <div className="sm:col-span-7">
                            <p className="whitespace-pre-line text-sm leading-relaxed text-ms-gray-secondary">
                              <AutoLink>
                                {func.description?.replace(/•\s*/g, "\n• ")}
                              </AutoLink>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {functions.map((func, index) => (
                      <div
                        key={`${func.name}-${index}`}
                        className="card-link group flex flex-col rounded-xl border border-ms-gray-border p-5"
                      >
                        <a
                          href={`${baseUrl}function/${encodeURIComponent(func.name)}`}
                          className="font-mono text-[14px] font-semibold leading-6 text-ms-blue transition-colors hover:text-ms-blue-hover"
                        >
                          <span className="break-words">{func.name}</span>
                        </a>
                        <p className="mt-2 flex-1 whitespace-pre-line text-sm leading-relaxed text-ms-gray-secondary line-clamp-4">
                          <AutoLink>
                            {func.description?.replace(/•\s*/g, "\n• ")}
                          </AutoLink>
                        </p>
                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-ms-gray-border pt-3 text-xs font-medium text-ms-gray-secondary transition-colors group-hover:text-ms-blue">
                          <span>View function</span>
                          <ArrowUpRight className="h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="panel flex flex-col items-center justify-center px-6 py-16 text-center">
                <p className="text-lg font-semibold text-ms-gray">
                  No functions found in this category
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
