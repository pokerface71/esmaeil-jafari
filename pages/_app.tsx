import "@styles/globals.css";
import type { AppProps } from "next/app";
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
    <I18nProvider>
      <ThemeProvider>
        <PageContent Component={Component} pageProps={pageProps} router={router} />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default Application;
