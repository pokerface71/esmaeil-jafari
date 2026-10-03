import { describe, expect, it } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { I18nProvider, useI18n } from "lib/i18n";
import type { ReactNode, ReactElement } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nProvider>{children}</I18nProvider>
);

describe("I18nProvider", () => {
  it("defaults to English / LTR", async () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    await waitFor(() => expect(result.current.locale).toBe("en"));
    expect(result.current.dir).toBe("ltr");
  });

  it("translates known keys", async () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    await waitFor(() => expect(result.current.t("nav.home")).toBe("Home"));
  });

  it("falls back to the key itself for unknown keys", async () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    await waitFor(() => expect(result.current.t("nope.missing")).toBe("nope.missing"));
  });

  it("persists locale to localStorage and sets dir=rtl for fa", async () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    await waitFor(() => expect(result.current.locale).toBe("en"));

    act(() => result.current.setLocale("fa"));
    await waitFor(() => expect(result.current.locale).toBe("fa"));
    expect(result.current.dir).toBe("rtl");
    expect(window.localStorage.getItem("locale")).toBe("fa");
  });

  it("restores stored locale after mount", async () => {
    window.localStorage.setItem("locale", "tr");
    const { result } = renderHook(() => useI18n(), { wrapper });
    await waitFor(() => expect(result.current.locale).toBe("tr"));
    expect(document.documentElement.getAttribute("lang")).toBe("tr");
    expect(document.documentElement.getAttribute("dir")).toBe("ltr");
  });

  it("exposes translated experience data per locale", async () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    await waitFor(() => expect(result.current.t("exp.dinawin.company")).toBe("Dinawin"));
  });
});
