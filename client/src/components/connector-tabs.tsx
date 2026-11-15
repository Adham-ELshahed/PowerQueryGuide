import { BookOpen, Code2 } from "lucide-react";

export type ConnectorView = "guide" | "reference";

interface ConnectorTabsProps {
  /** Which half of the dual structure is currently showing */
  active: ConnectorView;
  /** State setter — switching must never touch the browser history */
  onChange: (view: ConnectorView) => void;
  /** Guide display name (used for accessible labels) */
  guideName: string;
  /** Entry function — the "M Code Reference" target */
  functionName: string;
}

/**
 * The guide <-> reference switch for the dual structure, rendered on both
 * ends (the practical guide at /connectors/<slug> and the M reference at
 * /function/<name>).
 *
 * Deliberately NOT a link: both halves render on the same page and are
 * swapped with React state, so switching views is instant and never pushes
 * a new entry onto the browser's history stack (the back button keeps
 * working as the user expects). Sticky under the site header so the switch
 * stays reachable while reading either document.
 *
 * The caption always names the view that is on screen ("Current View: …")
 * rather than the opposite, hidden option.
 */
export default function ConnectorTabs({
  active,
  onChange,
  guideName,
  functionName,
}: ConnectorTabsProps) {
  const segment =
    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/40";
  const on = "bg-white text-ms-gray shadow-xs";
  const off = "text-ms-gray-secondary hover:text-ms-blue";

  return (
    <div className="sticky top-16 z-40 flex flex-wrap items-center gap-3 bg-canvas py-2 shadow-xs">
      <nav
        aria-label={`${guideName} documentation for ${functionName}`}
        className="inline-flex items-center gap-1 rounded-xl border border-ms-gray-border bg-canvas-inset p-1 shadow-xs"
      >
        <button
          type="button"
          aria-current={active === "guide" ? "page" : undefined}
          onClick={() => onChange("guide")}
          className={`${segment} ${active === "guide" ? on : off}`}
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          Practical Guide
        </button>
        <button
          type="button"
          aria-current={active === "reference" ? "page" : undefined}
          onClick={() => onChange("reference")}
          className={`${segment} ${active === "reference" ? on : off}`}
        >
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          M Code Reference
        </button>
      </nav>
      <span className="hidden items-center gap-2 rounded-full border border-ms-gray-border bg-canvas-inset px-3 py-1 sm:inline-flex">
        <span className="eyebrow-muted">Current View:</span>
        <span className="text-xs font-semibold text-ms-gray">
          {active === "guide" ? "Practical Guide" : "M Code Reference"}
        </span>
      </span>
    </div>
  );
}
