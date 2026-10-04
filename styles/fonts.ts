import { Inter, JetBrains_Mono, Poppins, Vazirmatn } from "next/font/google";

/**
 * Self-hosted webfonts, loaded through `next/font`.
 *
 * This replaces the render-blocking Google Fonts `@import` that used to sit at
 * the top of styles/globals.css:
 *   - stylesheets no longer wait on fonts.googleapis.com before they can be
 *     applied (the @import chained a third-party request in front of FCP),
 *   - font files are served from our own origin: no third-party request, no
 *     extra DNS/TLS handshake, no cookie exposure to Google,
 *   - variable fonts ship as a single file per subset instead of one file per
 *     weight (Inter/Vazirmatn/JetBrains Mono went from 20+ files to 4),
 *   - `adjustFontFallback` (on by default) renders a metric-compatible
 *     fallback immediately, so text paints with zero layout shift.
 *
 * The `variable` classes are applied to <html> in pages/_document.tsx, so any
 * stylesheet rule (body, [dir='rtl'], code chips …) can resolve them.
 */

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  display: "swap",
  variable: "--font-inter",
});

/** Persian/Arabic — Vazirmatn is a comprehensive Arabic-Persian designer
 *  sans-serif covering both scripts, so one family serves fa + ar. */
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-vazirmatn",
  preload: false,
});

/** Turkish — static family, only fetched once lang="tr" renders. */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
  preload: false,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-jetbrains",
});

/** Applied to <html>: defines every font CSS variable for the whole document. */
export const fontVariables = [
  inter.variable,
  vazirmatn.variable,
  poppins.variable,
  jetBrainsMono.variable,
].join(" ");
