import React, { useState } from "react";
import {
  Highlight,
  themes,
  type Language,
  type PrismTheme,
} from "prism-react-renderer";
import { useI18n } from "lib/i18n";

/**
 * Syntax-highlighted code block for blog posts.
 *
 * - Real token highlighting via Prism (prism-react-renderer)
 * - Header bar with language label + copy button
 * - Line numbers (skipped for one-liners to reduce noise)
 * - Custom VSCode-dark-like theme tuned to the site's palette
 *
 * Language aliases Prism understands out of the box include:
 * js, jsx, ts, tsx, html, css, scss, json, bash, python, sql, yaml, md, …
 */

// ---------------------------------------------------------------------------
// Theme — based on the built-in VSCode dark theme, adjusted for the glassy
// violet look of the site and the dark card background.
// ---------------------------------------------------------------------------

const siteTheme: PrismTheme = {
  ...themes.vsDark,
  plain: {
    color: "#e2e8f0",
    backgroundColor: "transparent",
  },
};

const LANGUAGE_LABELS: Record<string, string> = {
  js: "JavaScript",
  jsx: "JSX",
  javascript: "JavaScript",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sass: "Sass",
  json: "JSON",
  bash: "Bash",
  shell: "Shell",
  sh: "Shell",
  python: "Python",
  py: "Python",
  sql: "SQL",
  yaml: "YAML",
  yml: "YAML",
  md: "Markdown",
  markdown: "Markdown",
  php: "PHP",
  java: "Java",
  go: "Go",
  rust: "Rust",
  diff: "Diff",
};

// Prism needs a language; unknown names fall back to markup so nothing breaks.
const SUPPORTED = new Set([
  "js", "jsx", "javascript", "ts", "tsx", "typescript",
  "html", "css", "scss", "sass", "json", "bash", "shell", "sh",
  "python", "py", "sql", "yaml", "yml", "md", "markdown", "php",
  "java", "go", "rust", "diff",
]);

function resolveLanguage(lang: string): Language {
  return (SUPPORTED.has(lang) ? lang : "markup") as Language;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "" }: CodeBlockProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const lang = language.trim().toLowerCase();
  const prismLang = resolveLanguage(lang);
  const label = LANGUAGE_LABELS[lang] ?? (lang ? lang.toUpperCase() : "Code");
  const showLineNumbers = code.trim().split("\n").length > 1;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <div
      dir="ltr"
      style={{ textAlign: "left" }}
      className="code-block group/code relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2">
        <div className="flex items-center gap-2.5">
          {/* Traffic-light dots — purely decorative */}
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-200/70">
            {label}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:border-violet-400/40 hover:text-foreground"
          aria-live="polite"
        >
          {copied ? "✓" : "⧉"}{" "}
          {copied ? t("blog.copied_code") : t("blog.copy_code")}
        </button>
      </div>

      {/* Code */}
      <Highlight code={code} language={prismLang} theme={siteTheme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            className="overflow-x-auto p-4 text-[13px] leading-relaxed"
            style={{ background: "transparent", margin: 0 }}
            dir="ltr"
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={`table-row ${lineProps.className ?? ""}`}
                >
                  {showLineNumbers && (
                    <span
                      aria-hidden="true"
                      className="table-cell select-none pe-4 text-end font-mono text-[11px] text-slate-500/50"
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell font-mono">
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token });
                      return (
                        <span
                          key={key}
                          {...tokenProps}
                          style={tokenProps.style}
                        />
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
