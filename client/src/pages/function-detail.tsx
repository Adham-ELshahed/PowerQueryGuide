import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import DocsLayout from "@/components/layout/docs-layout";
import ConnectorTabs, { type ConnectorView } from "@/components/connector-tabs";
import GuideView from "@/components/guide-view";
import FunctionReferenceView from "@/components/function-reference-view";
import { ArrowLeft } from "lucide-react";
import { type Function } from "@shared/schema";
import {
  enumerationForMember,
  enumerationForName,
  enumerationHref,
  memberAnchor,
} from "@/data/enumerations";
import { connectorGuideForFunction } from "@/data/connectors";
import { formatCategoryLabelWithFunctions } from "@/lib/category-label";

export default function FunctionDetail() {
  const { functionName } = useParams<{ functionName: string }>();
  const { data: allFunctions } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const decodedName = decodeURIComponent(functionName || "");
  const func = allFunctions?.find(f => f.name === decodedName);
  const isLoading = !allFunctions;
  const [, navigate] = useLocation();

  /* Legacy URLs such as /function/Day.Monday predate the dedicated
     enumeration pages — send them there instead of a dead end. */
  const legacyMember = enumerationForMember(decodedName);
  const legacyType = legacyMember ? undefined : enumerationForName(decodedName);
  const legacyHref = legacyMember
    ? `${enumerationHref(legacyMember.slug)}#${memberAnchor(decodedName)}`
    : legacyType
      ? enumerationHref(legacyType.slug)
      : null;

  /* Connector guide that documents this function as its entry point, if any */
  const connectorGuide = connectorGuideForFunction(decodedName);

  /* Which half of the dual structure is on screen. Defaults to the reference
     because that is what this route is; switching is plain React state — no
     history entries are pushed, so the back button never gets hijacked. */
  const [view, setView] = useState<ConnectorView>("reference");

  useEffect(() => {
    if (isLoading || func || !legacyHref) return;
    navigate(legacyHref, { replace: true });
  }, [isLoading, func, legacyHref, navigate]);

  if (isLoading) {
    return (
      <DocsLayout />
    );
  }

  if (!func) {
    /* Constant/type name — the redirect effect above is taking over. */
    if (legacyHref) return <DocsLayout />;

    return (
      <DocsLayout>
        <div className="px-6 pt-8 text-center">
          <h1 className="text-2xl font-bold mt-20">Function not found</h1>
          <a
            href={`${import.meta.env.BASE_URL}functions`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ms-blue hover:text-ms-blue-hover hover:underline"
          >
            ← Back to all functions
          </a>
        </div>
      </DocsLayout>
    );
  }

  const showGuide = Boolean(connectorGuide) && view === "guide";

  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">

            {/* Breadcrumb */}
            <nav className="mb-7" aria-label="Breadcrumb">
              <a
                href={`${import.meta.env.BASE_URL}category/${encodeURIComponent(func.category)}`}
                className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-white px-3 py-1.5 text-sm font-medium text-ms-gray-secondary shadow-xs transition-all hover:border-ms-blue/40 hover:text-ms-blue"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to {formatCategoryLabelWithFunctions(func.category)}
              </a>
            </nav>

            {/* Guide ⇄ Reference tabs (entry-function pages only) — placed
                directly under the breadcrumb so they are above the fold on
                both halves (guide and reference, iframe branch included). */}
            {connectorGuide && (
              <ConnectorTabs
                active={view}
                onChange={setView}
                guideName={connectorGuide.name}
                functionName={func.name}
              />
            )}

            {showGuide ? (
              <GuideView
                guide={connectorGuide!}
                onShowReference={() => setView("reference")}
              />
            ) : (
              <FunctionReferenceView func={func} />
            )}

          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
