import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "wouter";
import DocsLayout from "@/components/layout/docs-layout";
import ConnectorTabs, { type ConnectorView } from "@/components/connector-tabs";
import GuideView from "@/components/guide-view";
import FunctionReferenceView from "@/components/function-reference-view";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { connectorGuideForSlug } from "@/data/connector-guides";
import { type Function } from "@shared/schema";

/**
 * Practical connector guide — the "guide" half of the dual structure.
 * Renders any entry of data/connector-guides.ts at /connectors/<slug>.
 *
 * Both halves (the guide and the M Code Reference for its entry function)
 * live on this page and are swapped with React state via ConnectorTabs, so
 * switching views is instant and never pushes a history entry.
 */
export default function ConnectorGuide() {
  const { slug } = useParams<{ slug: string }>();
  const guide = connectorGuideForSlug(slug ?? "");
  const { data: allFunctions } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });
  const [view, setView] = useState<ConnectorView>("guide");

  if (!guide) {
    return (
      <DocsLayout>
        <div className="px-6 pt-8 text-center">
          <h1 className="text-2xl font-bold mt-20">Connector guide not found</h1>
          <p className="mt-3 text-sm text-ms-gray-secondary">
            No practical guide is published for “{slug}”.
          </p>
          <Link
            href="/connectors"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ms-blue hover:text-ms-blue-hover hover:underline"
          >
            ← Back to all connectors
          </Link>
        </div>
      </DocsLayout>
    );
  }

  const primaryFunction = guide.functions[0];
  const primaryFunc = allFunctions?.find((f) => f.name === primaryFunction);

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Breadcrumb */}
            <nav className="mb-7" aria-label="Breadcrumb">
              <Link
                href="/connectors"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-white px-3 py-1.5 text-sm font-medium text-ms-gray-secondary shadow-xs transition-all hover:border-ms-blue/40 hover:text-ms-blue"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to all connectors
              </Link>
            </nav>

            {/* Guide ⇄ Reference tabs — state only, no history pushes */}
            <ConnectorTabs
              active={view}
              onChange={setView}
              guideName={guide.name}
              functionName={primaryFunction}
            />

            {view === "guide" ? (
              <>
                <GuideView
                  guide={guide}
                  onShowReference={() => setView("reference")}
                />

                {/* Foot — switch to the reference half in place */}
                <footer className="panel mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
                  <div className="text-sm text-ms-gray-secondary">
                    Need the exact signatures and parameters?
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setView("reference")}
                      className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 -mx-2 text-ms-blue font-medium transition-colors hover:bg-ms-blue-light/60 cursor-pointer"
                    >
                      Read the {primaryFunction} reference
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </footer>
              </>
            ) : primaryFunc ? (
              <FunctionReferenceView func={primaryFunc} />
            ) : (
              <div className="panel p-6 text-sm text-ms-gray-secondary">
                Loading the {primaryFunction} reference…
              </div>
            )}
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
