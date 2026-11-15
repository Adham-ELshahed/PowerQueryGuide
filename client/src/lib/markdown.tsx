import { linkifyHtml } from "@/lib/link-rules";

/**
 * Shared markdown renderer for long-form content (blog posts and connector
 * practical guides). Parses a restricted markdown dialect — headings, fenced
 * code, blockquotes, horizontal rules, bullet/numbered lists, inline bold,
 * italic, code and links — then runs the global auto-linker over every prose
 * fragment so function / data type / enumeration mentions become internal
 * links without altering the surrounding text. Code fences are never linked,
 * keeping snippets copy-paste safe.
 *
 * Splitting is fence-aware: blank lines inside ``` blocks stay in the block
 * so grouped code never shatters into prose fragments.
 */

/** Parse inline markdown (bold, italic, code, links) + auto-link the result. */
export const renderInline = (text: string) => {
  let html = text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      // References inside this site stay in the same tab and use the shared
      // link style (absolute powerquery.guide URLs are made relative).
      if (url.startsWith('/') || url.includes('powerquery.guide/')) {
        const href = url.replace(/^https:\/\/powerquery\.guide/, '');
        return `<a href="${href}" class="auto-link font-medium">${linkText}</a>`;
      }
      // Default styling for external links
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-ms-blue hover:underline font-medium">${linkText}</a>`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Escaped backticks for build safety
    .replace(new RegExp("`(.*?)`", "g"), '<code class="code-inline">$1</code>');
  // Hyper-link functions / data types / enumeration constants already named
  // in the copy (content itself is never changed — only wrapped in <a>).
  return { __html: linkifyHtml(html, { className: 'auto-link' }) };
};

/**
 * Split content into paragraphs on blank lines — but keep ``` fenced code
 * blocks intact even when the code itself contains blank lines (e.g. groups
 * of commented steps), so a fence never breaks into prose fragments.
 */
export const splitParagraphs = (text: string): string[] => {
  const parts: string[] = [];
  let current: string[] = [];
  let inFence = false;
  for (const line of text.split('\n')) {
    const isFenceLine = line.trimStart().startsWith('```');
    if (isFenceLine) {
      if (!inFence && current.length > 0) {
        // Prose directly followed by an opening fence (no blank line) — keep
        // them as separate blocks so the text isn't lost inside the code panel.
        parts.push(current.join('\n'));
        current = [];
      }
      current.push(line);
      inFence = !inFence;
      if (!inFence) {
        // The closing fence ends its block — anything after it starts fresh
        // instead of being swallowed by the code-block renderer.
        parts.push(current.join('\n'));
        current = [];
      }
      continue;
    }
    if (!inFence && line.trim() === '') {
      parts.push(current.join('\n'));
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) parts.push(current.join('\n'));

  // Headings written without blank lines around them (standard markdown
  // uses a single newline) would otherwise render their whole block —
  // heading AND surrounding paragraphs — as one giant heading. Split every
  // heading line into its own block wherever it appears; content that
  // already uses blank lines renders identically. Fence parts are skipped
  // so a ``` block is never broken apart.
  const peeled: string[] = [];
  for (const part of parts) {
    if (part.trimStart().startsWith('```')) {
      peeled.push(part);
      continue;
    }
    let buffer: string[] = [];
    const flush = () => {
      const text = buffer.join('\n');
      if (text.trim() !== '') peeled.push(text);
      buffer = [];
    };
    for (const line of part.split('\n')) {
      if (line.startsWith('## ') || line.startsWith('### ')) {
        flush();
        peeled.push(line);
      } else {
        buffer.push(line);
      }
    }
    flush();
  }
  return peeled.filter((part) => part.trim() !== '');
};

interface MarkdownProps {
  content: string;
  /** Optional image tokens: a paragraph equal to a token renders that image. */
  images?: Record<string, string>;
}

export function Markdown({ content, images }: MarkdownProps) {
  return (
    <>
      {splitParagraphs(content).map((paragraph, pIndex) => {
        const trimmedPara = paragraph.trim();
        if (!trimmedPara) return null;

        // 1. IMAGE TOKENS (blog illustrations)
        if (images && images[trimmedPara]) {
          return (
            <div key={pIndex} className="my-8 flex justify-center">
              <img
                src={images[trimmedPara]}
                alt="Blog illustration"
                className="rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          );
        }

        // 2. RAW HTML TABLES/BLOCKS
        if (trimmedPara.startsWith('<')) {
          return (
            <div
              key={pIndex}
              className="my-6 overflow-x-auto w-full"
              dangerouslySetInnerHTML={{ __html: linkifyHtml(trimmedPara, { className: 'auto-link' }) }}
            />
          );
        }

        // 3. CODE BLOCKS — using safe string construction to avoid ESBuild regex parsing issues
        if (trimmedPara.startsWith('```')) {
          const match = trimmedPara.match(new RegExp("```(\\w*)\\n([\\s\\S]*?)\\n?```"));
          if (match) {
            const language = match[1] || 'code';
            // Match the label <CodeBlock> shows for M snippets
            const languageLabel = language.toLowerCase() === 'powerquery' ? 'Power Query M' : language;
            const code = match[2];
            return (
              <div key={pIndex} className="code-panel my-6">
                <div className="code-bar">
                  <span className="code-label">{languageLabel}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
                <pre>
                  <code>{code}</code>
                </pre>
              </div>
            );
          }
        }

        // 4. BLOCKQUOTES
        if (trimmedPara.startsWith('> ')) {
          return (
            <blockquote key={pIndex} className="border-l-4 border-ms-blue bg-canvas-inset pl-5 py-4 pr-4 rounded-r-lg my-6 text-ms-gray-secondary">
              <div dangerouslySetInnerHTML={renderInline(trimmedPara.replace(/^>\s?/gm, ''))} />
            </blockquote>
          );
        }

        // 5. HORIZONTAL RULE
        if (trimmedPara === '---') {
          return <hr key={pIndex} className="my-10 border-t-2 border-ms-gray-border" />;
        }

        // 6. HEADINGS
        if (trimmedPara.startsWith('## ')) {
          return <h2 key={pIndex} className="text-2xl font-bold text-ms-gray mt-10 mb-5" dangerouslySetInnerHTML={renderInline(trimmedPara.slice(3))} />;
        }
        if (trimmedPara.startsWith('### ')) {
          return <h3 key={pIndex} className="text-xl font-bold text-ms-gray mt-8 mb-4" dangerouslySetInnerHTML={renderInline(trimmedPara.slice(4))} />;
        }
        // Support for existing **Heading** syntax that is single lined
        if (trimmedPara.startsWith('**') && trimmedPara.endsWith('**') && !trimmedPara.includes('\n')) {
          return (
            <h3 key={pIndex} className="text-xl font-bold text-ms-gray mt-8 mb-4">
              <span dangerouslySetInnerHTML={renderInline(trimmedPara.slice(2, -2))} />
            </h3>
          );
        }

        // 7 & 8. MIXED TEXT AND LISTS (or plain paragraphs)
        const lines = trimmedPara.split('\n');

        const hasListItems = lines.some(line => {
          const tl = line.trim();
          return tl.startsWith('- ') || /^\d+[\.-]\s/.test(tl);
        });

        if (hasListItems) {
          return (
            <div key={pIndex} className="mb-5 text-ms-gray-secondary leading-relaxed space-y-2">
              {lines.map((line, lIndex) => {
                const tl = line.trim();
                if (!tl) return null;

                if (tl.startsWith('- ')) {
                  return (
                    <div key={lIndex} className="flex items-start ml-4">
                      <span className="text-ms-blue mr-3 mt-1 font-bold text-sm">•</span>
                      <div className="flex-1" dangerouslySetInnerHTML={renderInline(tl.slice(2))} />
                    </div>
                  );
                } else if (/^\d+[\.-]\s/.test(tl)) {
                  const match = tl.match(/^(\d+)[\.-]\s(.*)/);
                  const num = match ? match[1] : '1';
                  const listContent = match ? match[2] : tl;
                  return (
                    <div key={lIndex} className="flex items-start ml-4">
                      <span className="text-ms-blue mr-2 min-w-[20px] font-semibold">{num}.</span>
                      <div className="flex-1" dangerouslySetInnerHTML={renderInline(listContent)} />
                    </div>
                  );
                } else {
                  // Regular text line inside a mixed block (e.g. opening sentence before a list)
                  return (
                    <div key={lIndex} dangerouslySetInnerHTML={renderInline(tl)} />
                  );
                }
              })}
            </div>
          );
        }

        // 8. REGULAR PARAGRAPHS (no lists detected)
        return (
          <p
            key={pIndex}
            className="mb-5 text-ms-gray-secondary leading-relaxed"
            dangerouslySetInnerHTML={renderInline(trimmedPara)}
          />
        );
      })}
    </>
  );
}
