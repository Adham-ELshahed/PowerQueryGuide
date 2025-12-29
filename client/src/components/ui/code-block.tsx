"use client";

import { useEffect, useState } from "react";
import { formatPowerQuery } from "@/lib/CodeBlockFormat";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    <SyntaxHighlighter
      language="m"
      style={vscDarkPlus}
      showLineNumbers
      wrapLines
      customStyle={{
        borderRadius: "8px",
        fontSize: "14px",
        padding: "1rem",
        backgroundColor: "#1e1e1e",
      }}
    >
      {formatted.trim()}
    </SyntaxHighlighter>
  );
}
