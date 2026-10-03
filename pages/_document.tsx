import { Html, Head, Main, NextScript } from "next/document";
import { fontVariables } from "styles/fonts";

/**
 * Default document.
 *
 * - `lang` boots as "en" — the language the SSR HTML is rendered in — and
 *   lib/i18n keeps it (and `dir`) in sync with the visitor's stored locale
 *   after mount.
 * - The font variable classes live on <html> so stylesheet rules can resolve
 *   `var(--font-*)` even when they target <body> itself.
 */
export default function Document() {
  return (
    <Html lang="en" className={fontVariables}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
