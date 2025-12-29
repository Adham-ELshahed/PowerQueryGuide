"use client";

import { useEffect, useState } from "react";
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

  return (
    <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-auto text-sm">
      <code className="font-mono whitespace-pre-wrap">
        {formatted.trim()}
      </code>
    </pre>
  );
}
