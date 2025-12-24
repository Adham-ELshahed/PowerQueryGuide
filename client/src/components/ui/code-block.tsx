import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border border-neutral-800 bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-800 bg-[#252526]">
        <span className="text-xs text-neutral-300 font-medium">
          Power Query M
        </span>

        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-6 px-2 text-xs text-neutral-300 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-[13px] leading-5 font-mono text-neutral-100">
        <code className="block whitespace-pre">
          {code}
        </code>
      </pre>

      {/* Left accent bar (Microsoft Learn vibe) */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-500" />
    </div>
  );
}
