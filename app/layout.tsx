import "@styles/globals.css";
import { Providers } from "components/Providers";
import { Inter, JetBrains_Mono, Poppins, Vazirmatn } from "next/font/google";
import { Suspense } from "react";

// fonts: pull the next/font CSS (variable font faces + --font-* variables)
// into the app bundle so they are emitted to .next/static; the root layout
// puts the `fontVariables` classes on <html> (replacing pages/_document.tsx).
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  display: "swap",
  variable: "--font-inter"
});
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-vazirmatn",
  preload: false
});
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
  preload: false
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-jetbrains"
});

const fontClasses = [
  inter.variable,
  vazirmatn.variable,
  poppins.variable,
  jetBrainsMono.variable
].join(" ");

/**
 * Root layout: the App Router equivalent of pages/_app.tsx + pages/_document.tsx.
 *
 * - `<html>` gets the font variable classes so every stylesheet rule can
 *   resolve var(--font-*) (fontVariables, formerly pages/_document.tsx).
 * - Favicon/icon-set + theme-color links from pages/_app.tsx live here for
 *   metadata, because `metadata` is the App Router counterpart of next/head
 *   (global link tags).
 * - I18nProvider/ThemeProvider own browser-only state (localStorage, document
 *   attributes), so they are wrapped in a client component: components/Providers.
 */
export const metadata = {
  metadataBase: new URL("https://esmaeiljafari.dev"),
  title: {
    default: "Esmaeil Jafari — Frontend Developer",
    template: "%s | Esmaeil Jafari"
  },
  description:
    "Professional portfolio of Esmaeil Jafari — Frontend Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06060b" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" }
  ],
  appleWebApp: {
    title: "Esmaeil Jafari",
    status: "enabled"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className={fontClasses}>
      <head>
        <meta
          name="theme-color"
          content="#06060b"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#f7f8fb"
          media="(prefers-color-scheme: light)"
        />
        <meta name="msapplication-TileColor" content="#06060b" />
      </head>
      <body>
        <Suspense fallback={null}>
          <Suspense fallback={null}>
            <Providers>{children}</Providers>
          </Suspense>
        </Suspense>
      </body>
    </html>
  );
}
