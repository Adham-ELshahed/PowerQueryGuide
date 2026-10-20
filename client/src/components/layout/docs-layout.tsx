import { useState, useEffect, type ReactNode } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";

interface DocsLayoutProps {
  children?: ReactNode;
}

/**
 * Shared application shell: fixed header, fixed sidebar navigation,
 * scrollable content column and site footer. Every page renders inside
 * this layout so spacing, navigation and chrome stay consistent.
 *
 * The content column carries the tinted canvas so white docs surfaces
 * (cards, tables, toolbars) read as elevated paper. The shell also owns
 * the global "focus search" signal (⌘K / Ctrl K / "/") that the header
 * button and the sidebar search tab share.
 */
export default function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchSignal, setSearchSignal] = useState(0);

  const openSearch = () => {
    // Opens the off-canvas sidebar on small screens (overlay is lg:hidden).
    setIsMobileMenuOpen(true);
    setSearchSignal((signal) => signal + 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      const isCommandK =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const isSlash = event.key === "/" && !typing && !event.metaKey &&
        !event.ctrlKey && !event.altKey;

      if (isCommandK || isSlash) {
        event.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ms-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onSearch={openSearch}
      />

      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        focusSignal={searchSignal}
      />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-canvas pt-16 lg:pl-280">
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
