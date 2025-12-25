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
        const pretty = await formatPowerQuery(code);
        if (!cancelled) {
          setFormatted(pretty);
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
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
      <code className="font-mono whitespace-pre">
        {formatted.trim()}
      </code>
    </pre>
  );
}
