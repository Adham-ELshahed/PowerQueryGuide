import { useQuery } from "@tanstack/react-query";
import DocsLayout from "@/components/layout/docs-layout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { type Function } from "@shared/schema";
import { AutoLink } from "@/lib/auto-link";
import { Search, LayoutGrid, List, SearchX, ArrowUpRight } from "lucide-react";

type ViewMode = "list" | "grid";

const VIEW_KEY = "functions-view";

export default function Functions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [view, setView] = useState<ViewMode>("list");

  /* Remember the list/grid preference */
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

  const { data: functions, isLoading } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const filteredFunctions = functions?.filter((func) => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || func.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(functions?.map(f => f.category) || []));

  const resultCount = filteredFunctions?.length || 0;

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
            {/* Page header */}
            <header className="mb-8">
              <p className="eyebrow mb-2.5">Reference</p>
              <h1 className="text-4xl font-bold tracking-tight text-ms-gray">Functions</h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ms-gray-secondary">
                Search the complete M function reference by name, description or category.
              </p>
            </header>

            {/* Toolbar */}
            <div className="panel mb-6 flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-gray-secondary" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 shadow-none"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48" aria-label="Filter by category">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' and ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center justify-between gap-3 border-ms-gray-border lg:border-l lg:pl-3">
                <p className="text-xs font-medium tabular-nums text-ms-gray-secondary">
                  {isLoading ? "Loading..." : `${resultCount} functions found`}
                </p>

                <div
                  className="flex gap-1 rounded-xl border border-ms-gray-border bg-ms-gray-light p-1"
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
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="panel overflow-hidden">
                <div className="h-10 bg-ms-gray-light px-5 py-3">
                  <div className="h-4 w-1/4 rounded bg-ms-gray-border/70 animate-pulse" />
                </div>
                <div className="divide-y divide-ms-gray-border">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="px-5 py-4 animate-pulse">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="h-4 w-1/3 rounded bg-ms-gray-light mb-2" />
                          <div className="h-3.5 w-2/3 rounded bg-ms-gray-light" />
                        </div>
                        <div className="h-5 w-20 rounded bg-ms-gray-light" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredFunctions && filteredFunctions.length > 0 ? (
              view === "list" ? (
                /* ---------- List view ---------- */
                <div className="panel overflow-hidden">
                  <div className="hidden bg-ms-gray-light px-5 py-3 sm:grid sm:grid-cols-12 sm:gap-4 text-[11px] font-semibold uppercase tracking-wider text-ms-gray-secondary">
                    <div className="col-span-4">Function Name</div>
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2 text-right">Category</div>
                  </div>
                  <div className="divide-y divide-ms-gray-border">
                    {filteredFunctions.map((func, index) => (
                      <div
                        key={`${func.name}-${index}`}
                        className="list-row grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-12 sm:items-start sm:gap-4"
                      >
                        <div className="sm:col-span-4">
                          <a
                            href={`/function/${encodeURIComponent(func.name)}`}
                            className="group/name inline-flex items-start gap-1 font-mono text-[13.5px] font-medium leading-6 text-ms-blue transition-colors hover:text-ms-blue-hover"
                          >
                            <span className="break-all">{func.name}</span>
                            <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/name:opacity-100" />
                          </a>
                        </div>
                        <div className="sm:col-span-6">
                          <p className="text-sm leading-relaxed text-ms-gray-secondary">
                            <AutoLink>{func.description}</AutoLink>
                          </p>
                        </div>
                        <div className="sm:col-span-2 sm:text-right">
                          <a
                            href={`/category/${encodeURIComponent(func.category)}`}
                            className="inline-block whitespace-nowrap rounded-md border border-ms-gray-border bg-white px-2 py-0.5 text-xs font-medium capitalize text-ms-gray-secondary transition-colors hover:border-ms-blue/40 hover:bg-ms-blue-light hover:text-ms-blue"
                          >
                            {func.category.replace('-', ' ')}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ---------- Grid view ---------- */
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredFunctions.map((func, index) => (
                    <div
                      key={`${func.name}-${index}`}
                      className="card-link group flex flex-col rounded-xl border border-ms-gray-border p-5"
                    >
                      <a
                        href={`/function/${encodeURIComponent(func.name)}`}
                        className="font-mono text-[14px] font-semibold leading-6 text-ms-blue transition-colors hover:text-ms-blue-hover"
                      >
                        <span className="break-all">{func.name}</span>
                      </a>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ms-gray-secondary line-clamp-3">
                        <AutoLink>{func.description}</AutoLink>
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-ms-gray-border pt-3">
                        <a
                          href={`/category/${encodeURIComponent(func.category)}`}
                          className="rounded-md border border-ms-gray-border bg-white px-2 py-0.5 text-xs font-medium capitalize text-ms-gray-secondary transition-colors hover:border-ms-blue/40 hover:bg-ms-blue-light hover:text-ms-blue"
                        >
                          {func.category.replace('-', ' ')}
                        </a>
                        <ArrowUpRight className="h-4 w-4 text-ms-gray-border transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ms-blue" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="panel flex flex-col items-center justify-center px-6 py-16 text-center">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ms-gray-light text-ms-gray-secondary">
                  <SearchX className="h-5 w-5" />
                </span>
                <p className="text-lg font-semibold text-ms-gray">No functions found</p>
                <p className="mt-1.5 text-sm text-ms-gray-secondary">
                  Try adjusting your search query or category filter.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
