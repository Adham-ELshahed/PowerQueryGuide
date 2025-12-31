import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { ArrowLeft } from "lucide-react";
import { type Function } from "@shared/schema";

export default function FunctionDetail() {
  const { functionName } = useParams<{ functionName: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: allFunctions } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const func = allFunctions?.find(
    f => f.name === decodeURIComponent(functionName || "")
  );

  const isLoading = !allFunctions;
  const error = allFunctions && !func ? new Error("Function not found") : null;

  const handleNavigation = (
    url: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
      setIsMobileMenuOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <div className="flex">
          <Sidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    );
  }

  if (error || !func) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <div className="flex">
          <Sidebar
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
          <main className="flex-1 px-6 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Function Not Found</h1>
              <a
                href="/functions"
                onClick={(e) => handleNavigation("/functions", e)}
                className="text-ms-blue hover:underline"
              >
                ← Back to Functions
              </a>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="flex">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="ml-0 lg:ml-280 flex-1 px-6 py-8">
          <div className="max-w-4xl mx-auto">

            {/* Breadcrumb */}
            <div className="mb-6">
              <a
                href={`/category/${encodeURIComponent(func.category)}`}
                onClick={(e) =>
                  handleNavigation(
                    `/category/${encodeURIComponent(func.category)}`,
                    e
                  )
                }
                className="text-ms-blue flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {func.category.replace(/[-_]/g, " ")} functions
              </a>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">{func.name}</h1>
              <p className="text-lg text-ms-gray-secondary">
                {func.description}
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline">
                  {func.category.replace(/[-_]/g, " ")}
                </Badge>
                {func.deprecated && (
                  <Badge variant="destructive">Deprecated</Badge>
                )}
              </div>
            </div>

            {/* Syntax */}
            <Card className="mb-6" id="syntax">
              <CardHeader>
                <CardTitle>Syntax</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={func.syntax || `${func.name}()`} />
              </CardContent>
            </Card>

            {/* 🔹 Images for List.Dates */}
            {func.name === "List.Dates" && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Visual Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <p className="text-sm mb-2 text-ms-gray-secondary">
                        Step 1 – Generate the date range
                      </p>
                      <img
                        src={`${import.meta.env.BASE_URL}images/functions/list.dates/step1.png`}
                        alt="List.Dates step 1"
                        className="rounded-lg border"
                      />
                    </div>

                    <div>
                      <p className="text-sm mb-2 text-ms-gray-secondary">
                        Step 2 – Apply interval logic
                      </p>
                      <img
                        src={`${import.meta.env.BASE_URL}images/functions/list.dates/step2.png`}
                        alt="List.Dates step 2"
                        className="rounded-lg border"
                      />
                    </div>

                    <div>
                      <p className="text-sm mb-2 text-ms-gray-secondary">
                        Step 3 – Final result
                      </p>
                      <img
                        src={`${import.meta.env.BASE_URL}images/functions/list.dates/step3.png`}
                        alt="List.Dates step 3"
                        className="rounded-lg border"
                      />
                    </div>
                  </div>
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
                    <CodeBlock key={i} code={ex.code || ex.syntax} />
                  ))}
                </CardContent>
              </Card>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
