import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
  /** Opens the sidebar search tab (⌘K / Ctrl K / "/") */
  onSearch?: () => void;
}

export default function Header({ isMobileMenuOpen, onMobileMenuToggle, onSearch }: HeaderProps) {
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const [location] = useLocation();

  const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad/i.test(navigator.platform);

  const navigationLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/datatypes", label: "Data Types" },
    { href: "/enumerations", label: "Enumerations" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
  ];

  const isActive = (href: string) =>
    location === href || location.startsWith(`${href}/`);

  const searchButtonClasses =
    "group flex items-center gap-2 rounded-lg border border-ms-gray-border bg-white " +
    "pl-2.5 pr-2 py-1.5 text-[13px] font-medium text-ms-gray-secondary " +
    "transition-all hover:border-ms-gray hover:text-ms-gray hover:shadow-xs " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/40";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-stretch">
        {/* Brand block — aligns with the sidebar column on desktop */}
        <div className="hidden lg:flex w-280 shrink-0 items-center gap-3 border-r border-border pl-5 pr-4">
          <Link href="/" className="flex items-center gap-3 rounded-md focus-visible:outline-none">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-ms-gray-border p-1.5 shadow-xs">
              <img
                src={`${import.meta.env.BASE_URL}pq-logo.jfif`}
                alt="Power Query Guide Logo"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[13.5px] font-bold tracking-tight text-ms-gray">
                Power Query Guide
              </span>
              <span className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ms-gray-secondary">
                M Language Reference
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile / tablet brand + hamburger */}
        <div className="flex flex-1 items-center justify-between px-4 lg:hidden">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 h-9 w-9 p-0 text-ms-gray hover:bg-ms-gray-light hover:text-ms-blue"
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              onClick={onMobileMenuToggle}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-ms-gray-border p-1.5">
                <img
                  src={`${import.meta.env.BASE_URL}pq-logo.jfif`}
                  alt="Power Query Guide Logo"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-[13.5px] font-semibold tracking-tight text-ms-gray">
                Power Query Guide
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={onSearch}
            aria-label="Search functions"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ms-gray-border bg-white text-ms-gray-secondary transition-colors hover:text-ms-blue"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-1 pr-5">
          <button
            type="button"
            onClick={onSearch}
            className={`${searchButtonClasses} mr-3`}
            aria-label="Search functions"
          >
            <Search className="h-4 w-4 transition-colors group-hover:text-ms-blue" />
            <span className="hidden xl:inline text-ms-gray-secondary group-hover:text-ms-gray">
              Search functions
            </span>
            <span className="kbd ml-1 hidden sm:inline-flex" aria-hidden="true">
              {isMac ? "⌘K" : "Ctrl K"}
            </span>
          </button>

          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition-all ${
                isActive(link.href)
                  ? "bg-ms-blue-light text-ms-blue shadow-xs"
                  : "text-ms-gray-secondary hover:bg-ms-gray-light hover:text-ms-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile navigation dropdown */}
        <div className="flex items-center pr-4 lg:hidden relative">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 px-2 text-ms-gray hover:bg-ms-gray-light"
            onClick={() => setIsTopMenuOpen(!isTopMenuOpen)}
            aria-expanded={isTopMenuOpen}
          >
            <span className="text-sm font-medium">Menu</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isTopMenuOpen ? "rotate-180" : ""}`}
            />
          </Button>

          {isTopMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-border bg-popover py-1.5 shadow-lg">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-ms-blue-light font-medium text-ms-blue"
                      : "text-ms-gray-secondary hover:bg-ms-gray-light hover:text-ms-gray"
                  }`}
                  onClick={() => setIsTopMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile dropdown overlay */}
      {isTopMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsTopMenuOpen(false)}
        />
      )}
    </header>
  );
}
