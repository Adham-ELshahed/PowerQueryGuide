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

/* ✅ IMPORT IMAGES */
import step1 from "@/attached_assets/functions/list.dates/step1.jfif";
import step2 from "@/attached_assets/functions/list.dates/step2.jfif";
import step3 from "@/attached_assets/functions/list.dates/step3.jfif";

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
        <Header isMobileMenuOpen={isMobileMenuOpen} onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
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
              <p className="text-lg text-ms-gray-secondary">{func.description}</p>
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

                  <div>
                    <p className="mb-3 font-medium">1️⃣ Initial data</p>
                    <img src={step1} alt="List.Dates step 1" className="rounded-lg border" />
                  </div>

                  <div>
                    <p className="mb-3 font-medium">2️⃣ Applying List.Dates</p>
                    <img src={step2} alt="List.Dates step 2" className="rounded-lg border" />
                  </div>

                  <div>
                    <p className="mb-3 font-medium">3️⃣ Final result</p>
                    <img src={step3} alt="List.Dates step 3" className="rounded-lg border" />
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
                    <div key={i}>
                      {ex.title && <h4 className="font-semibold mb-2">{ex.title}</h4>}
                      {ex.syntax && <CodeBlock code={ex.syntax} />}
                      {ex.output && <CodeBlock code={ex.output} />}
                    </div>
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
