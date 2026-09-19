import React from "react";
import CodeBlock from "@components/Blog/CodeBlock";

/**
 * Minimal, safe markdown-ish renderer for blog post content.
 *
 * Supported syntax (enough for blog posts):
 *   # / ## / ### headings
 *   - / * / 1. list items
 *   > blockquote
 *   ``` code blocks ``` and `inline code`
 *   **bold**  *italic*  [text](url)  ![alt](image-url)
 *   ---  horizontal rule
 *
 * It renders React elements directly from a parse pass — no dangerouslySetInnerHTML
 * — so editor-supplied content can never inject raw HTML.
 *
 * Code is escaped only in the sense that we never interpret HTML; React escapes
 * all text output automatically.
 */

// ---------------------------------------------------------------------------
// Inline parsing: returns React nodes for bold / italic / code / links / images
// ---------------------------------------------------------------------------

const INLINE_PATTERN =
  /(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(`[^`]+`)/g;

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  const re = new RegExp(INLINE_PATTERN); // fresh regex (global state)

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("![")) {
      // ![alt](url)
      const m = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (m) {
        nodes.push(
          <a
            key={`${keyPrefix}-img-${i}`}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            title="View full size"
            className="block my-6"
          >
            <img
              src={m[2]}
              alt={m[1] || ""}
              className="mx-auto block w-auto max-w-full rounded-2xl border border-white/10"
              loading="lazy"
            />
          </a>
        );
      }
    } else if (token.startsWith("[")) {
      // [text](url)
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${i}`}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-300 hover:text-violet-200 underline decoration-violet-400/40 underline-offset-4 transition-colors"
          >
            {m[1]}
          </a>
        );
      }
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i}`}
          className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[0.85em] text-violet-200"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("*")) {
      nodes.push(
        <em key={`${keyPrefix}-i-${i}`}>{token.slice(1, -1)}</em>
      );
    }

    lastIndex = match.index + token.length;
    i++;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

// ---------------------------------------------------------------------------
// Block parsing
// ---------------------------------------------------------------------------

interface Block {
  type: "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "quote" | "code" | "hr";
  lines: string[];
  lang?: string;
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trimStart().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++; // closing fence
      blocks.push({ type: "code", lines: code, lang });
      continue;
    }

    // Horizontal rule
    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
      blocks.push({ type: "hr", lines: [] });
      i++;
      continue;
    }

    // Headings
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push({
        type: level === 1 ? "h1" : level === 2 ? "h2" : "h3",
        lines: [heading[2]],
      });
      i++;
      continue;
    }

    // Blockquote
    if (line.trimStart().startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith(">")) {
        quote.push(lines[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", lines: quote });
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", lines: items });
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", lines: items });
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph (gather consecutive non-empty, non-special lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !lines[i].trimStart().startsWith("```") &&
      !lines[i].trimStart().startsWith(">") &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*(---+|\*\*\*+)\s*$/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", lines: para });
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = React.useMemo(() => parseBlocks(content), [content]);

  return (
    <div className="markdown-body">
      {blocks.map((block, bi) => {
        const key = `b-${bi}`;
        switch (block.type) {
          case "h1":
            return (
              <h2
                key={key}
                className="text-2xl sm:text-3xl font-bold mt-10 mb-4 tracking-tight text-foreground"
              >
                {renderInline(block.lines[0], key)}
              </h2>
            );
          case "h2":
            return (
              <h3
                key={key}
                className="text-xl sm:text-2xl font-bold mt-8 mb-3 tracking-tight text-foreground"
              >
                {renderInline(block.lines[0], key)}
              </h3>
            );
          case "h3":
            return (
              <h4
                key={key}
                className="text-lg font-semibold mt-6 mb-2 text-foreground"
              >
                {renderInline(block.lines[0], key)}
              </h4>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="border-s-2 border-violet-400/50 ps-4 my-6 text-muted-foreground italic"
              >
                {block.lines.map((l, li) => (
                  <p key={`${key}-${li}`}>{renderInline(l, `${key}-${li}`)}</p>
                ))}
              </blockquote>
            );
          case "code":
            return (
              <CodeBlock
                key={key}
                code={block.lines.join("\n")}
                language={block.lang ?? ""}
              />
            );
          case "ul":
            return (
              <ul key={key} className="my-4 space-y-2 ps-5 list-disc marker:text-violet-400/70">
                {block.lines.map((l, li) => (
                  <li key={`${key}-${li}`} className="leading-relaxed">
                    {renderInline(l, `${key}-${li}`)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="my-4 space-y-2 ps-5 list-decimal marker:text-violet-400/70">
                {block.lines.map((l, li) => (
                  <li key={`${key}-${li}`} className="leading-relaxed">
                    {renderInline(l, `${key}-${li}`)}
                  </li>
                ))}
              </ol>
            );
          case "hr":
            return (
              <hr key={key} className="my-8 border-white/10" />
            );
          case "p":
          default:
            return (
              <p key={key} className="my-4 leading-loose text-muted-foreground">
                {block.lines.map((l, li) => (
                  <React.Fragment key={`${key}-${li}`}>
                    {li > 0 && <br />}
                    {renderInline(l, `${key}-${li}`)}
                  </React.Fragment>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}
