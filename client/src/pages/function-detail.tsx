import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, type ReactNode } from "react";
import { useParams, Link, useLocation } from "wouter";
import DocsLayout from "@/components/layout/docs-layout";
import { CodeBlock } from "@/components/ui/code-block";
import { AutoLink } from "@/lib/auto-link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { type Function } from "@shared/schema";
import {
  enumerationForMember,
  enumerationForName,
  enumerationHref,
  memberAnchor,
} from "@/data/enumerations";

/* IMAGE URLS FOR PRODUCTION (public folder) */
const imageMap: Record<string, string> = {
  list_dates_step1: "attached_assets/functions/list.dates/step1.jfif",
  list_dates_step2: "attached_assets/functions/list.dates/step2.jfif",
  list_dates_step3: "attached_assets/functions/list.dates/step3.jfif",
  etsy_link_raci_matrics: "attached_assets/functions/Raci Matrix image.jpeg",
  list_dates_working_days: "attached_assets/functions/list.dates/image_aadd94.jpeg",
};

/* List of functions that have a dedicated HTML page */
const htmlFunctions = ["Access.Database"];

type MParameter = { name: string; type?: string; description?: string };
type MExample = { title?: string; syntax?: string; output?: string };

/**
 * Docs section: white panel with a compact uppercase header bar.
 * Title text is identical to the previous Card titles.
 */
function Section({
  title,
  children,
  className = "",
  tint = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section className={`panel mb-6 overflow-hidden ${className}`}>
      <div
        className={`flex items-center gap-2.5 border-b border-ms-gray-border px-5 py-3 sm:px-6 ${
          tint ? "bg-ms-blue-light/60" : "bg-canvas-inset"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${tint ? "bg-ms-blue" : "bg-ms-gray-border"}`}
          aria-hidden="true"
        />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
          {title}
        </h2>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warn";
}) {
  const tones = {
    neutral: "border-ms-gray-border bg-ms-gray-light text-ms-gray-secondary",
    accent: "border-ms-blue/30 bg-ms-blue-light text-ms-blue",
    warn: "border-amber-300/70 bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export default function FunctionDetail() {
  const { functionName } = useParams<{ functionName: string }>();
  const [hasVideo, setHasVideo] = useState<boolean | undefined>(undefined);
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

  useEffect(() => {
    if (isLoading || func || !legacyHref) return;
    navigate(legacyHref, { replace: true });
  }, [isLoading, func, legacyHref, navigate]);
  const videoPath = func
    ? `${import.meta.env.BASE_URL}videos/${func.name.toLowerCase()}.mp4`
    : null;

  useEffect(() => {
    if (!videoPath) return;

    const video = document.createElement("video");
    video.src = videoPath;

    video.onloadeddata = () => setHasVideo(true);
    video.onerror = () => setHasVideo(false);
  }, [videoPath]);

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

  /* functions.json ships these as loosely-typed values */
  const parameters = (Array.isArray(func.parameters) ? func.parameters : []) as MParameter[];
  const examples = (Array.isArray(func.examples) ? func.examples : []) as MExample[];

  const isListDates = func.name === "List.Dates";
  const isNumberToText = func.name === "Number.ToText";
  const hasHtmlPage = htmlFunctions.includes(func.name);
  const showEtsyCTA = ["Table.Pivot", "Table.Group"].includes(func.name);

  /* HTML page URL if available */
  const htmlFileName = hasHtmlPage ? `${import.meta.env.BASE_URL}html/functions/${func.name}.html` : null;

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
                Back to {func.category.replace(/[-_]/g, " ")} functions
              </a>
            </nav>

            {/* If HTML page exists, show iframe + optional video */}
            {hasHtmlPage ? (
              <>
                <iframe
                  src={htmlFileName!}
                  className="w-full border-0 rounded-xl"
                  title={func.name}
                  onLoad={(e) => {
                    const iframe = e.currentTarget;
                    try {
                      iframe.style.height =
                        iframe.contentWindow?.document.body.scrollHeight + "px";
                    } catch (err) {
                      console.warn("Cannot auto-adjust iframe height", err);
                    }
                  }}
                />

                {/* Render video only if it exists */}
                {hasVideo === true && (
                  <Section title="Video Explanation" className="mt-6">
                    <video controls className="w-full rounded-lg">
                      <source src={videoPath!} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Section>
                )}
              </>
            ) : (

              <>
                {/* Header */}
                <header className="panel mb-6 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-mono text-3xl font-bold tracking-tight text-ms-gray sm:text-4xl">
                      {func.name}
                    </h1>
                    <a
                      href={`${import.meta.env.BASE_URL}category/${encodeURIComponent(func.category)}`}
                      className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2 py-0.5 text-xs font-medium text-ms-blue transition-colors hover:border-ms-blue/50 hover:text-ms-blue-hover"
                    >
                      {func.category}
                    </a>
                    {func.deprecated === true && <Chip tone="warn">Deprecated</Chip>}
                    {func.volatile === true && <Chip>Volatile</Chip>}
                  </div>

                  <div className="mt-5 max-w-3xl text-lg leading-8 text-ms-gray-secondary">
                    {func.description
                      ?.replace(/\s*•\s*/g, "\n• ")
                      .split("\n")
                      .map((line, index) => {
                        const isBulletPoint = line.trim().startsWith("•");
                        return (
                          <p
                            key={index}
                            className={`${index > 0 ? "mt-2" : ""} ${isBulletPoint ? "ml-6" : ""}`}
                          >
                            <AutoLink>{line}</AutoLink>
                          </p>
                        );
                      })}
                  </div>
                </header>

                {/* Syntax */}
                <Section title="Syntax">
                  <CodeBlock code={func.syntax || `${func.name}()`} />
                </Section>

                {/* Parameters */}
                {parameters.length > 0 && (
                  <Section title="Parameters">
                    <div className="space-y-3">
                      {parameters.map((p, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-ms-gray-border bg-canvas p-4"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <code className="font-mono text-sm font-semibold text-ms-gray">
                              {p.name}
                            </code>
                            {p.type && <Chip tone="accent">{p.type}</Chip>}
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-ms-gray-secondary">
                            <AutoLink>{p.description}</AutoLink>
                          </p>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Images Section – List.Dates only */}
                {isListDates && (
                  <Section title="Step-by-step Example">
                    <div className="space-y-8">
                      {["list_dates_step1", "list_dates_step2", "list_dates_step3"].map((key, idx) => (
                        <div key={idx}>
                          <p className="mb-3 font-medium">
                            {["1️⃣ Initial data", "2️⃣ Applying List.Dates", "3️⃣ Final result"][idx]}
                          </p>
                          <img
                            src={`${import.meta.env.BASE_URL}${imageMap[key]}`}
                            alt={`List.Dates ${key}`}
                            className="rounded-lg border"
                          />
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {!hasHtmlPage && hasVideo === true && (
                  <Section title="Video Explanation">
                    <video controls className="w-full rounded-lg">
                      <source src={videoPath!} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Section>
                )}

                {/* Examples */}
                {(examples.length > 0 || isListDates) && (
                  <Section title="Examples">
                    <div className="space-y-6">
                      {examples.map((ex, i) => (
                        <div key={i}>
                          {ex.title && (
                            <h3 className="mb-2.5 font-mono text-[13px] font-semibold uppercase tracking-wider text-ms-gray-secondary">
                              {ex.title}
                            </h3>
                          )}
                          {ex.syntax && <CodeBlock code={ex.syntax} />}
                          {ex.output && <CodeBlock code={ex.output} />}
                        </div>
                      ))}

                      {/* Working Days Example - Nested inside the Examples card for List.Dates */}
                      {isListDates && (
                        <div className={examples.length > 0 ? "pt-6 border-t border-ms-gray-border mt-6" : ""}>
                          <h4 className="font-semibold mb-3">Working Days Calculation Example</h4>
                          <p className="text-sm text-ms-gray-secondary mb-4">
                            See how List.Dates can calculate working days and generate weekly summaries. Download the Excel file below to explore the tables shown in the image.
                          </p>
                          <img
                            src={`${import.meta.env.BASE_URL}${imageMap.list_dates_working_days}`}
                            alt="List.Dates Working Days Example"
                            className="rounded-lg border max-w-full h-auto mb-4"
                          />
                          <a
                            href={`${import.meta.env.BASE_URL}attached_assets/functions/list.dates/WorkingDaysExample.xlsx`}
                            download
                            className="inline-flex items-center gap-2 text-ms-blue font-medium hover:underline text-sm"
                          >
                            Download the Excel Template
                          </a>
                        </div>
                      )}
                    </div>
                  </Section>
                )}

                {/* Format Strings Guide – Number.ToText only */}
                {isNumberToText && (
                  <Section title="Format Strings Guide" className="border-ms-blue/40" tint>
                    <p className="text-ms-gray-secondary mb-4">
                      When defining the <code>format</code> parameter, you can use standard or custom patterns to control exactly how the number appears.
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/docs/standard-numeric-format-strings"
                        className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 -mx-2 text-ms-blue font-medium transition-colors hover:bg-ms-blue-light/60"
                      >
                        👉 Standard Numeric Format Strings
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href="/docs/custom-numeric-format-strings"
                        className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 -mx-2 text-ms-blue font-medium transition-colors hover:bg-ms-blue-light/60"
                      >
                        👉 Custom Numeric Format Strings
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </Section>
                )}

                {showEtsyCTA && (
                  <Section title="Take It Further" className="border-green-500/40">
                    <p className="text-ms-gray-secondary mb-3">
                      Want to apply this in real projects with a ready-to-use structure?
                      Get a fully automated RACI template powered by Power Query.
                    </p>

                    <a
                      href="https://www.etsy.com/listing/4338525810/raci-matrix-with-additional-power-query"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-700 font-medium hover:underline"
                    >
                      👉 Get the RACI Matrix Template
                    </a>

                    <div className="mt-4 flex justify-center">
                      <img
                        src={`${import.meta.env.BASE_URL}${imageMap.etsy_link_raci_matrics}`}
                        alt="RACI Matrix Template"
                        className="rounded-lg shadow-md max-w-full h-auto hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                      />
                    </div>
                  </Section>
                )}

                {/* Blog Post Link – List.Dates only */}
                {isListDates && (
                  <Section title="In-depth Guide" className="border-ms-blue/40" tint>
                    <p className="text-ms-gray-secondary mb-3">
                      For a detailed explanation with real-world scenarios and dynamic examples,
                      check out the full blog post.
                    </p>

                    <a
                      href={`${import.meta.env.BASE_URL}blog#list-dates-power-query`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-ms-blue font-medium hover:underline"
                    >
                      👉 Read the complete List.Dates guide
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Section>
                )}
              </>
            )}

          </div>
        </main>
      </div>
    </DocsLayout>
  );
}
