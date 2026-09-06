import "@styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "components/ThemeProvider";
import { I18nProvider, useI18n } from "lib/i18n";
import { cn } from "lib/utils";

function PageContent({ Component, pageProps, router }: AppProps) {
  const { isTransitioning } = useI18n();
  return (
    <div className="relative min-h-screen">
      <div className={cn("relative z-10 locale-transition", isTransitioning && "transitioning")}>
        <Component {...pageProps} router={router} />
      </div>
    </div>
  );
}

function Application({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        {/* Favicon / icon set (SEO best practice) */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#06060b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#f7f8fb" media="(prefers-color-scheme: light)" />
        <meta name="msapplication-TileColor" content="#06060b" />
      </Head>
      <I18nProvider>
        <ThemeProvider>
          <PageContent Component={Component} pageProps={pageProps} router={router} />
        </ThemeProvider>
      </I18nProvider>
    </>
  );
}

export default Application;
