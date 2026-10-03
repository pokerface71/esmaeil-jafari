import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { vi } from "vitest";
import { I18nProvider } from "lib/i18n";
import { ThemeProvider } from "components/ThemeProvider";
import { mockRouter, mockSearchParams } from "./mocks/next";

vi.mock("next/head", () => ({
  __esModule: true,
  default: (props: { children: React.ReactNode }) => <>{props.children}</>,
}));

// Reset the static mock search params between tests so `?scroll=` state does
// not leak across tests (because `useSearchParams` returns a shared instance).
beforeEach(() => {
  mockSearchParams.delete("scroll");
});

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </I18nProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export { mockRouter };
