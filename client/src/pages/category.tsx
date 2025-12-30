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
  const { category } = useParams<{ category: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}categories.json`);
      return res.json();
    },
  });

  const { data: functions } = useQuery<Function[]>({
    queryKey: ["functions"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}functions.json`);
      return res.json();
    },
  });

  // ✅ المقارنة الصح
  const categoryData = categories?.find(
    (c) => c.slug === category
  );

  const filteredFunctions = functions?.filter(
    (f) => f.category === category
  );

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin + import.meta.env.BASE_URL
      : "";

  const isLoading = !categories || !functions;

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
          <a
            href={`${baseUrl}functions`}
            className="text-ms-blue flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to groups
          </a>

          <h1 className="text-3xl font-bold mb-4">
            {categoryData?.title ?? "Category"}
          </h1>

          {categoryData?.description && (
            <p className="text-gray-600 mb-8">
              {categoryData.description}
            </p>
          )}

          {isLoading ? (
            <p>Loading...</p>
          ) : filteredFunctions && filteredFunctions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Function</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFunctions.map((fn) => (
                  <TableRow key={fn.id}>
                    <TableCell className="font-mono">
                      <a
                        href={`${baseUrl}function/${encodeURIComponent(fn.name)}`}
                        className="text-ms-blue hover:underline"
                      >
                        {fn.name}
                      </a>
                    </TableCell>
                    <TableCell>{fn.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No functions found in this category</p>
          )}
        </main>
      </div>
    </div>
  );
}
