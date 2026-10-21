import { AlertCircle } from "lucide-react";
import DocsLayout from "@/components/layout/docs-layout";

export default function NotFound() {
  return (
    <DocsLayout>
      <div className="flex w-full flex-1 items-center justify-center px-4 py-24">
        <div className="panel mx-4 w-full max-w-md p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-ms-blue" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-ms-gray">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-ms-gray-secondary">
            Did you forget to add the page to the router?
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
