import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "wouter";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { type Function, type Category } from "@shared/schema";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const categoryName = decodeURIComponent(params.category ?? "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin + import.meta.env.BASE_URL
      : "";

  const { data: categories, isLoading: loadingCategories } =
    useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: async () => {
        const res = await fetch(
          `${import.meta.env.BASE_URL}categories.json`
        );
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      },
    });

  const { data: allFunctions, isLoading: loadingFunctions } =
    useQuery<Function[]>({
      queryKey: ["functions"],
      queryFn: async () => {
        const res = await fetch(
          `${import.meta.env.BASE_URL}functions.json`
        );
        if (!res.ok) throw new Error("Failed to load functions");
        return res.json();
      },
    });

  const isLoading = loadingCategories || loadingFunctions;

  const categoryData = categories?.find(
  (c) => c.name.toLowerCase() === categoryName.toLowerCase()
);

const functions = allFunctions?.filter(
  (f) => f.category.toLowerCase() === categoryName.toLowerCase()
);

  console.log("categoryName:", categoryName);
  console.log("categories:", categories);
  console.log("allFunctions:", allFunctions);
  console.log("categoryData:", categoryData);
  console.log("first function category:", allFunctions?.[0]?.category);


  const categoryDisplayName = categoryData
    ? `${categoryData.name} functions`
    : "Category";

  return (
    <div className="min-h-screen bg-white pt-16">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() =>
          setIsMobileMenuOpen(!isMobileMenuOpen)
        }
      />
      <div className="flex">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="ml-0 lg:ml-280 flex-1 min-h-screen px-4 lg:px-0">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <a
                href={`${baseUrl}functions`}
                className="text-ms-blue hover:text-ms-blue-hover text-sm flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Functions
              </a>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-ms-gray mb-4">
                {categoryDisplayName}
              </h1>
              {categoryData && (
                <p className="text-lg text-ms-gray-secondary">
                  {categoryData.description}
                </p>
              )}
            </div>

            {/* Count */}
            <div className="mb-6">
              <p className="text-sm text-ms-gray-secondary">
                {isLoading
                  ? "Loading..."
                  : `${functions?.length ?? 0} functions in this category`}
              </p>
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-100 rounded mb-2"
                  />
                ))}
              </div>
            ) : functions && functions.length > 0 ? (
              <div className="border border-ms-gray-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Function Name</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {functions.map((func) => (
                      <TableRow key={func.id}>
                        <TableCell className="font-mono">
                          <a
                            href={`${baseUrl}function/${encodeURIComponent(
                              func.name
                            )}`}
                            className="text-ms-blue hover:underline"
                          >
                            {func.name}
                          </a>
                        </TableCell>
                        <TableCell className="text-ms-gray-secondary whitespace-pre-line">
                          {func.description?.replace(/•\s*/g, "\n• ")}
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-ms-gray-secondary">
                  No functions found in this category
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}