import { Markdown } from "@/lib/markdown";
import { AutoLink } from "@/lib/auto-link";
import { Link } from "wouter";
import type { ReactNode } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { ConnectorGuide } from "@/data/connector-guides";

/* ------------------------------------------------------------------ local
   Design-system primitive (same shape as the old connector-guide page) */

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-ms-gray-border bg-canvas p-4">
      <div className="eyebrow-muted mb-1.5">{label}</div>
      <div className="text-sm font-semibold leading-relaxed text-ms-gray">
        {children}
      </div>
    </div>
  );
}

interface GuideViewProps {
  guide: ConnectorGuide;
  /**
   * Switches the surrounding tab to the M Code Reference half without a
   * navigation. When omitted (defensive fallback), the controls link to the
   * standalone reference page instead.
   */
  onShowReference?: () => void;
}

/**
 * The "Practical Guide" half of the dual structure — the header panel, the
 * at-a-glance facts and the guide article. Rendered inside the tab system on
 * both ends: /connectors/<slug> and (when a guide exists) /function/<name>.
 * Owns no page chrome (breadcrumb / tabs) so the host page stays in charge.
 */
export default function GuideView({ guide, onShowReference }: GuideViewProps) {
  const primaryFunction = guide.functions[0];

  /* Reference control: an in-page tab switch when hosted inside the tab
     system, otherwise a plain link to the standalone reference page. */
  const referenceControl = (className: string, children: ReactNode) =>
    onShowReference ? (
      <button type="button" onClick={onShowReference} className={className}>
        {children}
      </button>
    ) : (
      <Link
        href={`/function/${encodeURIComponent(primaryFunction)}`}
        className={className}
      >
        {children}
      </Link>
    );

  return (
    <>
      {/* Header */}
      <header className="panel mb-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-ms-gray sm:text-4xl">
            {guide.name}
          </h1>
          <span className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2 py-0.5 text-xs font-medium text-ms-blue">
            {guide.group}
          </span>
          {guide.capabilities.map((mode) => (
            <span
              key={mode}
              className="rounded-md border border-ms-gray-border bg-canvas-inset px-2 py-0.5 text-xs font-medium text-ms-gray-secondary"
            >
              {mode}
            </span>
          ))}
        </div>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-ms-gray-secondary">
          <AutoLink>{guide.tagline}</AutoLink>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {referenceControl(
            "group inline-flex items-center gap-2 rounded-lg bg-ms-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ms-blue-hover cursor-pointer",
            <>
              M Code Reference
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
          {guide.msdoc && (
            <a
              href={guide.msdoc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-ms-gray-border bg-white px-4 py-2 text-sm font-semibold text-ms-gray-secondary transition-colors hover:border-ms-blue/40 hover:text-ms-blue"
            >
              Microsoft Learn documentation
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* At a glance */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2">
        <Fact label="Works in">{guide.products.join(" · ")}</Fact>
        {guide.authentication && guide.authentication.length > 0 && (
          <Fact label="Sign-in">
            {guide.authentication.join(" or ")}
          </Fact>
        )}
        <Fact label="Data access">
          {guide.capabilities.join(" · ")}
        </Fact>
        <Fact label="Entry function">
          {referenceControl(
            "font-mono text-ms-blue hover:text-ms-blue-hover hover:underline cursor-pointer",
            primaryFunction
          )}
          {guide.functions.length > 1 && (
            <span className="ml-1.5 font-normal text-ms-gray-secondary">
              (+{guide.functions.length - 1} related)
            </span>
          )}
        </Fact>
      </section>

      {/* Guide body */}
      <article>
        <Markdown content={guide.content} />
      </article>
    </>
  );
}
