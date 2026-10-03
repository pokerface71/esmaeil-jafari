"use client";

import type { ReactNode } from "react";
import { I18nProvider, useI18n } from "lib/i18n";
import { ThemeProvider } from "components/ThemeProvider";
import { cn } from "lib/utils";

/**
 * Wraps the tree in the locale transition div previously living in
 * pages/_app.tsx: fades content when the visitor switches language.
 */
function PageContent({ children }: { children: ReactNode }) {
  const { isTransitioning } = useI18n();
  return (
    <div className="relative min-h-screen">
      <div
        className={cn(
          "relative z-10 locale-transition",
          isTransitioning && "transitioning"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Client boundary for the root layout. I18nProvider/ThemeProvider own
 * localStorage + document attributes, so they can only run in the browser.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <PageContent>{children}</PageContent>
      </ThemeProvider>
    </I18nProvider>
  );
}
