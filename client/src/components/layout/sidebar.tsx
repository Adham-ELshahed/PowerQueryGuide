import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronRight, LayoutGrid, ArrowDownAZ } from "lucide-react";
import { type Function, type Category } from "@shared/schema";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  /** Incremented by the shell (⌘K / Ctrl K / header button) to open + focus search */
  focusSignal?: number;
}

const TABS = [
  { id: "az", label: "A-Z", Icon: ArrowDownAZ },
  { id: "groups", label: "Groups", Icon: LayoutGrid },
  { id: "search", label: "Search", Icon: Search },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** Shared row styling for navigation links inside the sidebar */
function linkClasses(isActive: boolean, dense = false) {
  return [
    "group flex items-center rounded-lg border px-2.5 transition-all duration-150",
    dense ? "py-1 text-[12.5px]" : "py-1.5 text-[13px]",
    isActive
      ? "border-ms-blue-light bg-ms-blue-light font-medium text-ms-blue shadow-xs"
      : "border-transparent text-ms-gray-secondary hover:border-ms-gray-border hover:bg-ms-gray-light hover:text-ms-gray",
  ].join(" ");
}

/** First character of a function name, bucketed into A–Z (or "#") */
function letterOf(name: string) {
  const ch = (name[0] || "#").toUpperCase();
  return /[A-Z]/.test(ch) ? ch : "#";
}

export default function Sidebar({ isOpen, onClose, focusSignal }: SidebarProps) {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sidebar-tab") as TabId) || "az";
    }
    return "az";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const searchInputRef = useRef<HTMLInputElement>(null);
  /** Scroll restore must run exactly once, after the rows exist — never on
   *  every scroll event (that used to cancel in-flight smooth scrolling). */
  const didRestoreScrollRef = useRef(false);

  const { data: functions } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: [`${import.meta.env.BASE_URL}categories.json`],
  });

  const sortedFunctions = functions?.slice().sort((a, b) => a.name.localeCompare(b.name)) || [];
  const searchResults = searchQuery.length > 0
    ? functions?.filter((func) => func.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 20) || []
    : [];

  const groupedFunctions = categories?.map(category => ({
    ...category,
    functions: functions?.filter(func => func.category === category.name).sort((a, b) => a.name.localeCompare(b.name)) || []
  })) || [];

  /* A-Z index: letter buckets + which letters actually have entries */
  const letterGroups = ALPHABET.map((letter) => ({
    letter,
    functions: sortedFunctions.filter((func) => letterOf(func.name) === letter),
  })).filter((group) => group.functions.length > 0);

  const isActiveFunction = (name: string) =>
    location === `/function/${encodeURIComponent(name)}`;
  const isActiveCategory = (name: string) =>
    location === `/category/${encodeURIComponent(name)}`;

  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) newExpanded.delete(groupName);
    else newExpanded.add(groupName);
    setExpandedGroups(newExpanded);
  };

  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_]/g, ' ');
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") localStorage.setItem("sidebar-tab", tab);
  };

  const navigateTo = (url: string) => {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    if (onClose) onClose();
  };

  const handleNavigation = (url: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      navigateTo(url);
    }
  };

  /** Scroll the A–Z list so the chosen letter sits at the top of the panel.
   *  The target is the group's (non-sticky) wrapper: the sticky letter header
   *  reports a visually shifted rect, which made scrollIntoView's offset a
   *  no-op for headers that were already stuck. Scrolling the container
   *  directly also keeps the page itself from scrolling along with it. */
  const jumpToLetter = (letter: string) => {
    const container = document.querySelector<HTMLElement>(
      "aside .overflow-y-auto"
    );
    const target = document.getElementById(`letter-${letter}`);
    if (!container || !target) return;

    const top =
      target.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;

    container.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGroups = localStorage.getItem("sidebar-expanded-groups");
      if (savedGroups) setExpandedGroups(new Set(JSON.parse(savedGroups)));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-expanded-groups", JSON.stringify(Array.from(expandedGroups)));
    }
  }, [expandedGroups]);

  /* Shell told us to open search (header button or ⌘K / Ctrl K / "/") */
  useEffect(() => {
    if (!focusSignal) return;
    handleTabChange("search");
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusSignal]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Persist straight to storage — no React state, so scrolling 651 rows
    // doesn't re-render the sidebar on every frame.
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sidebar-scroll",
        e.currentTarget.scrollTop.toString()
      );
    }
  };

  /* Restore the saved reading position once, when the rows first render. */
  useEffect(() => {
    if (didRestoreScrollRef.current || !functions || !categories) return;

    const container = document.querySelector<HTMLElement>(
      "aside .overflow-y-auto"
    );
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("sidebar-scroll")
        : null;
    const top = saved ? parseInt(saved, 10) : 0;

    if (container && top > 0) container.scrollTop = top;
    didRestoreScrollRef.current = true;
  }, [functions, categories]);

  // Close mobile sidebar when clicking on a link
  useEffect(() => {
    if (isOpen && onClose) {
      const links = document.querySelectorAll('aside a');
      const handleClick = () => onClose();
      links.forEach(link => link.addEventListener('click', handleClick));
      return () => links.forEach(link => link.removeEventListener('click', handleClick));
    }
  }, [isOpen, onClose]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      e.preventDefault();
      navigateTo(`/function/${encodeURIComponent(searchResults[0].name)}`);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        aria-label="Function reference navigation"
        className={`
          fixed left-0 top-16 bottom-0 w-280 z-40 flex flex-col
          bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Segmented tab bar */}
        <div className="shrink-0 border-b border-sidebar-border px-3 py-3">
          <div
            className="flex gap-1 rounded-xl border border-ms-gray-border bg-ms-gray-light p-1 shadow-inner"
            role="tablist"
            aria-label="Sidebar views"
          >
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all ${
                    selected
                      ? "bg-white text-ms-blue shadow-xs ring-1 ring-black/5"
                      : "text-ms-gray-secondary hover:text-ms-gray"
                  }`}
                >
                  <tab.Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto sidebar-scroll px-3 py-3" onScroll={handleScroll}>
          <div className="space-y-1">
            {/* A-Z Tab */}
            {activeTab === "az" && (
              <div>
                <div className="mb-2 px-1">
                  <span className="text-[11px] font-semibold text-ms-gray-secondary uppercase tracking-wider">
                    All Functions ({sortedFunctions.length})
                  </span>
                </div>

                {/* Quick alphabet jump */}
                <div className="mb-3 flex flex-wrap gap-1 px-0.5">
                  {ALPHABET.map((letter) => {
                    const available = letterGroups.some((group) => group.letter === letter);
                    return (
                      <button
                        key={letter}
                        type="button"
                        disabled={!available}
                        onClick={() => jumpToLetter(letter)}
                        aria-label={`Jump to functions starting with ${letter}`}
                        className={`h-6 w-6 rounded-md text-[11px] font-semibold transition-colors ${
                          available
                            ? "border border-ms-gray-border bg-white text-ms-gray-secondary hover:border-ms-blue hover:bg-ms-blue-light hover:text-ms-blue"
                            : "border border-transparent text-ms-gray-border/70 cursor-default"
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  {letterGroups.map((group) => (
                    /* id sits on the non-sticky wrapper — see jumpToLetter() */
                    <div key={group.letter} id={`letter-${group.letter}`}>
                      <div className="letter-head -mx-1 px-1">
                        {group.letter}
                        <span className="h-px flex-1 bg-ms-gray-border" aria-hidden="true" />
                        <span className="font-medium tabular-nums text-ms-gray-border/90">
                          {group.functions.length}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        {group.functions.map((func, index) => (
                          <a
                            key={`${func.name}-${index}`}
                            href={`/function/${encodeURIComponent(func.name)}`}
                            className={linkClasses(isActiveFunction(func.name))}
                            onClick={(e) => handleNavigation(`/function/${encodeURIComponent(func.name)}`, e)}
                          >
                            <span className="truncate">{func.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Groups Tab */}
            {activeTab === "groups" && (
              <div>
                <div className="sticky top-0 z-10 -mx-1 mb-2 bg-sidebar px-1 pt-1 pb-2">
                  <span className="text-[11px] font-semibold text-ms-gray-secondary uppercase tracking-wider">
                    Browse by Category
                  </span>
                </div>
                <div className="space-y-0.5">
                  {groupedFunctions.map((group) => (
                    <Collapsible
                      key={group.name}
                      open={expandedGroups.has(group.name)}
                      onOpenChange={() => toggleGroup(group.name)}
                    >
                      <div className="flex items-center gap-0.5">
                        <CollapsibleTrigger
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ms-gray-secondary transition-colors hover:bg-ms-gray-light hover:text-ms-gray"
                          aria-label={`${expandedGroups.has(group.name) ? "Collapse" : "Expand"} ${group.name}`}
                        >
                          <ChevronRight
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              expandedGroups.has(group.name) ? "rotate-90" : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                        <a
                          href={`/category/${group.name}`}
                          className={`flex-1 min-w-0 ${linkClasses(isActiveCategory(group.name))}`}
                          onClick={(e) => handleNavigation(`/category/${group.name}`, e)}
                        >
                          <span className="truncate">
                            {group.name === 'access-datafunctions' ? 'Access data' : formatCategoryName(group.name)}
                          </span>
                          <span className="ml-2 shrink-0 rounded-md bg-white/80 border border-ms-gray-border px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums text-ms-gray-secondary">
                            {group.functions.length}
                          </span>
                        </a>
                      </div>
                      <CollapsibleContent className="ml-5 mt-1 space-y-0.5 border-l border-ms-gray-border pl-2">
                        {group.functions.map((func, index) => (
                          <a
                            key={`${func.name}-${index}`}
                            href={`/function/${encodeURIComponent(func.name)}`}
                            className={linkClasses(isActiveFunction(func.name), true)}
                            onClick={(e) => handleNavigation(`/function/${encodeURIComponent(func.name)}`, e)}
                          >
                            <span className="truncate">{func.name}</span>
                          </a>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tab */}
            {activeTab === "search" && (
              <div>
                <div className="sticky top-0 z-10 -mx-1 mb-3 bg-sidebar px-1 pt-1 pb-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ms-gray-secondary" />
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search functions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      className="search-input w-full bg-white pl-9 pr-9 text-sm shadow-xs"
                      aria-label="Search functions"
                    />
                    <span
                      className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wider text-ms-gray-secondary sm:block"
                      aria-hidden="true"
                    >
                      ⏎
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {searchQuery.length === 0 ? (
                    <div className="px-2 py-6 text-center text-sm text-ms-gray-secondary">
                      Start typing to search functions
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="mb-2 px-1">
                        <span className="text-[11px] font-semibold text-ms-gray-secondary uppercase tracking-wider">
                          Search Results ({searchResults.length})
                        </span>
                      </div>
                      {searchResults.map((func, index) => (
                        <a
                          key={`${func.name}-${index}`}
                          href={`/function/${encodeURIComponent(func.name)}`}
                          className={`block rounded-lg border px-2.5 py-2 transition-all ${
                            isActiveFunction(func.name)
                              ? "border-ms-blue-light bg-ms-blue-light font-medium text-ms-blue"
                              : "border-transparent text-ms-gray-secondary hover:border-ms-gray-border hover:bg-ms-gray-light hover:text-ms-gray"
                          }`}
                          onClick={(e) => handleNavigation(`/function/${encodeURIComponent(func.name)}`, e)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="truncate text-[13px] font-medium">{func.name}</span>
                            <span className="ml-auto shrink-0 rounded bg-white/80 border border-ms-gray-border px-1.5 py-0.5 text-[10px] font-medium capitalize text-ms-gray-secondary">
                              {func.category.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="mt-0.5 truncate text-xs text-ms-gray-secondary">
                            {func.description.substring(0, 60)}...
                          </div>
                        </a>
                      ))}
                    </>
                  ) : (
                    <div className="px-2 py-6 text-center text-sm text-ms-gray-secondary">
                      No functions found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
