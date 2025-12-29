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

export default function FunctionDetail() {
  const { functionName } = useParams<{ functionName: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: allFunctions } = useQuery<Function[]>({
    queryKey: [`${import.meta.env.BASE_URL}functions.json`],
  });

  const func = allFunctions?.find(f => f.name === decodeURIComponent(functionName || ''));
  const isLoading = !allFunctions;
  const error = allFunctions && !func ? new Error('Function not found') : null;

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
          <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="h-6 bg-gray-100 rounded mb-8 w-2/3"></div>
                <div className="space-y-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </main>
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
          <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-ms-gray mb-4">Function Not Found</h1>
                <p className="text-ms-gray-secondary mb-6">
                  The function "{functionName}" could not be found.
                </p>
                <a 
                  href={`${window.location.origin}/functions`} 
                  className="text-ms-blue hover:text-ms-blue-hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ← Back to Functions
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const isTablePivotFunction = func?.name === "Table.Pivot";

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
        <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            
            {/* Breadcrumb */}
            <div className="mb-6">
              <a
                href={func?.category 
                      ? `${window.location.origin}/category/${encodeURIComponent(func.category)}`
                      : `${window.location.origin}/functions`}
                className="text-ms-blue hover:text-ms-blue-hover text-sm flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowLeft className="h-4 w-4" />
                {func?.category ? `Back to ${func.category.replace(/[-_]/g, ' ')} functions` : 'Back to Functions'}
              </a>
            </div>

            {/* Function Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-ms-gray">{func.name}</h1>
                <Badge variant="outline" className="text-xs">
                  {func.category?.replace(/[-_]/g, ' ') || 'Unknown'}
                </Badge>
                {func.deprecated && (
                  <Badge variant="destructive" className="text-xs">
                    Deprecated
                  </Badge>
                )}
                {func.volatile && (
                  <Badge variant="secondary" className="text-xs">
                    Volatile
                  </Badge>
                )}
              </div>
              <div className="text-lg text-ms-gray-secondary leading-relaxed">
                {func.description?.split('\n').map((line, index) => {
                  const isBulletPoint = line.trim().startsWith('•');
                  return (
                    <p key={index} className={`${index > 0 ? 'mt-2' : ''} ${isBulletPoint ? 'ml-6' : ''}`}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Section Navigation */}
            <div className="mb-8 p-4 bg-ms-gray-light rounded-lg border border-ms-gray-border">
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="#syntax" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                  Syntax
                </a>
                {func.parameters?.length > 0 && (
                  <a href="#parameters" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                    Parameters
                  </a>
                )}
                <a href="#return-value" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                  Return Value
                </a>
                {func.examples?.length > 0 && (
                  <a href="#examples" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                    Examples
                  </a>
                )}
                {func.remarks && (
                  <a href="#remarks" className="text-ms-blue hover:text-ms-blue-hover hover:underline">
                    Remarks
                  </a>
                )}
              </div>
            </div>

            {/* Syntax */}
            <Card className="mb-6" id="syntax">
              <CardHeader>
                <CardTitle className="text-xl">Syntax</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock code={func.syntax || `${func.name}()`} />
              </CardContent>
            </Card>

            {/* Parameters */}
            {func.parameters?.length > 0 && (
              <Card className="mb-6" id="parameters">
                <CardHeader>
                  <CardTitle className="text-xl">Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {func.parameters.map((param: any, index: number) => (
                      <div key={index} className="border-l-4 border-ms-blue-light pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-semibold text-ms-blue">{param.name}</span>
                          <Badge variant="outline" className="text-xs">{param.type}</Badge>
                        </div>
                        <p className="text-sm text-ms-gray-secondary">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Return Value */}
            <Card className="mb-6" id="return-value">
              <CardHeader>
                <CardTitle className="text-xl">Return Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{func.returnType || 'any'}</Badge>
                </div>
                <p className="text-sm text-ms-gray-secondary">
                  Returns a value of type {func.returnType || 'any'}.
                </p>
              </CardContent>
            </Card>

            {/* Examples */}
            {func.examples?.length > 0 && (
              <Card className="mb-6" id="examples">
                <CardHeader>
                  <CardTitle className="text-xl">Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {func.examples.map((example: any, index: number) => (
                      <div key={index} className="space-y-4">
                        <h4 className="font-semibold text-ms-gray mb-3">{example.title}</h4>
                        {example.explanation && (
                          <p className="text-ms-gray-secondary">{example.explanation}</p>
                        )}
                        {example.syntax && (
                          <div>
                            <h5 className="text-sm font-semibold text-ms-gray mb-2">Usage</h5>
                            <CodeBlock code={example.syntax} />
                          </div>
                        )}
                        {example.output && (
                          <div>
                            <h5 className="text-sm font-semibold text-ms-gray mb-2">Output</h5>
                            <CodeBlock code={example.output} />
                          </div>
                        )}
                        {!example.explanation && !example.syntax && !example.output && example.code && (
                          <CodeBlock code={example.code} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Remarks */}
            {func.remarks && (
              <Card className="mb-6" id="remarks">
                <CardHeader>
                  <CardTitle className="text-xl">Remarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-ms-gray-secondary leading-relaxed">
                    {func.remarks.split('\n').map((line, index) => {
                      const isBulletPoint = line.trim().startsWith('•');
                      return (
                        <p key={index} className={`${index > 0 ? 'mt-2' : ''} ${isBulletPoint ? 'ml-6' : ''}`}>
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Table.Pivot Advertisement */}
            {isTablePivotFunction && (
              <Card className="mb-6 bg-ms-green-light border-ms-blue">
                <CardHeader>
                  <CardTitle className="text-xl text-ms-blue">Build a RACI Matrix with Table.Pivot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-ms-gray-secondary mb-4">
                    Learn how to use Table.Pivot to transform your RACI matrix from a traditional grid into a powerful, analyzable flat table structure. This technique is perfect for project management, accountability tracking, and Power BI reporting.
                  </p>
                  <a 
                    href="https://businessish.etsy.com/listing/4338525810/raci-matrix-with-additional-power-query" 
                    className="text-ms-blue hover:text-ms-blue-hover font-semibold inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    → Get the complete RACI Matrix template with Power Query transformation
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
