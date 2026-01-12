import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowLeft } from "lucide-react";
import { type Function } from "@shared/schema";

/* ✅ IMAGE URLS FOR PRODUCTION (public folder) */
const imageMap: Record<string, string> = {
  step1: "/attached_assets/functions/list.dates/step1.jfif",
  step2: "/attached_assets/functions/list.dates/step2.jfif",
  step3: "/attached_assets/functions/list.dates/step3.jfif",
};

export default function FunctionDetail() {
  const { functionName } = useParams<{ functionName: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: allFunctions } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const decodedName = decodeURIComponent(functionName || "");
  const func = allFunctions?.find(f => f.name === decodedName);
  const isLoading = !allFunctions;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <div className="flex">
          <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    );
  }

  if (!func) {
    return (
      <div className="min-h-screen bg-white pt-16 text-center">
        <h1 className="text-2xl font-bold mt-20">Function not found</h1>
      </div>
    );
  }

  /* ✅ CHECK TARGET FUNCTION */
  const isListDates = func.name === "List.Dates";

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
          <div className="max-w-4xl mx-auto px-6 py-8">

            {/* Breadcrumb */}
            <div className="mb-6">
              <a
                href={`/category/${encodeURIComponent(func.category)}`}
                className="text-ms-blue hover:underline flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {func.category.replace(/[-_]/g, " ")} functions
              </a>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{func.name}</h1>
                <Badge variant="outline">{func.category}</Badge>
              </div>
              <div className="text-lg text-ms-gray-secondary leading-relaxed">
                {func.description
                  ?.replace(/\s*•\s*/g, "\n• ")
                  .split("\n")
                  .map((line, index) => {
                    const isBulletPoint = line.trim().startsWith("•");

                    return (
                      <p
                        key={index}
                        className={`${index > 0 ? "mt-2" : ""} ${isBulletPoint ? "ml-6" : ""
                          }`}
                      >
                        {line}
                      </p>
                    );
                  })}
              </div>

            </div>

            {/* Syntax */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Syntax</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={func.syntax || `${func.name}()`} />
              </CardContent>
            </Card>

            {/* Parameters */}
            {func.parameters?.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {func.parameters.map((p, i) => (
                    <div key={i}>
                      <div className="font-mono font-semibold">{p.name}</div>
                      <p className="text-sm text-ms-gray-secondary">{p.description}</p>
                      <Separator className="my-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* ✅ IMAGES SECTION – List.Dates ONLY */}
            {isListDates && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Step-by-step Example</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {["step1", "step2", "step3"].map((key, idx) => (
                    <div key={idx}>
                      <p className="mb-3 font-medium">
                        {["1️⃣ Initial data", "2️⃣ Applying List.Dates", "3️⃣ Final result"][idx]}
                      </p>
                      <img
                        src={imageMap[key]}
                        alt={`List.Dates ${key}`}
                        className="rounded-lg border"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Examples */}
            {func.examples?.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {func.examples.map((ex, i) => (
                    <div key={i}>
                      {ex.title && <h4 className="font-semibold mb-2">{ex.title}</h4>}
                      {ex.syntax && <CodeBlock code={ex.syntax} />}
                      {ex.output && <CodeBlock code={ex.output} />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* 🔗 Blog Post Link – List.Dates only */}
            {isListDates && (
              <Card className="mb-6 border-ms-blue/30">
                <CardHeader>
                  <CardTitle>In-depth Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ms-gray-secondary mb-3">
                    For a detailed explanation with real-world scenarios and dynamic examples,
                    check out the full blog post.
                  </p>

                  <a
                    href="/blog#list-dates-power-query"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-ms-blue font-medium hover:underline"
                  >
                    👉 Read the complete List.Dates guide
                  </a>
                </CardContent>
              </Card>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
