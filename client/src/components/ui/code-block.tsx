"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { formatPowerQuery } from "@/lib/CodeBlockFormat";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({
  code,
  language = "powerquery",
}: CodeBlockProps) {
  const [formatted, setFormatted] = useState(code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function format() {
      if (language === "powerquery") {
        try {
          // Use custom formatter for M/PowerQuery
          const pretty = await formatPowerQuery(code);
          if (!cancelled) {
            setFormatted(pretty);
          }
        } catch (err) {
          console.error("Failed to format PowerQuery code:", err);
          setFormatted(code); // fallback
        }
      } else {
        setFormatted(code);
      }
    }

    format();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted.trim());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const label = language === "powerquery" ? "Power Query M" : language;

  return (
    <div className="group/code overflow-hidden rounded-lg border border-[hsl(222_20%_18%)] bg-[hsl(222_28%_11%)] shadow-md">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
        <span className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-[#94a3b8]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#34d399]/70"
            aria-hidden="true"
          />
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-[#94a3b8] transition-colors hover:border-white/25 hover:text-[#e2e8f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/60"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-[#34d399]" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed text-[#d4d4d4]">
        <code className="font-mono whitespace-pre-wrap">
          {formatted.trim()}
        </code>
      </pre>
    </div>
  );
}
