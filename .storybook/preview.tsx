import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { themes } from "storybook/theming";
import { I18nProvider } from "../lib/i18n";
import "../styles/globals.css";

/** RTL/LTR wrapper driven by the `locale` global (toolbar selector). */
const WithI18n = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: string;
}) => {
  const rtl = locale === "fa" || locale === "ar";
  return (
    <div lang={locale ?? "en"} dir={rtl ? "rtl" : "ltr"}>
      <I18nProvider>{children}</I18nProvider>
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      options: {
        dark: { name: "dark", value: "#06060b" },
        light: { name: "light", value: "#f7f8fb" },
      },
      default: "dark",
    },
    docs: {
      theme: themes.dark,
    },
    a11y: {
      config: {
        rules: [
          // Decorative effect layers intentionally have low contrast.
          { id: "color-contrast", enabled: false },
        ],
      },
    },
  },
  globalTypes: {
    locale: {
      description: "UI language (drives dir=rtl for fa/ar)",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", title: "English (LTR)" },
          { value: "fa", title: "فارسی (RTL)" },
          { value: "ar", title: "العربية (RTL)" },
          { value: "tr", title: "Türkçe (LTR)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: "en",
  },
  decorators: [
    // Theme switch via data-theme attribute (also used by the app itself).
    withThemeByDataAttribute({
      themes: { dark: "dark", light: "light" },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
    (Story, context) => (
      <WithI18n locale={context.globals.locale}>
        <Story />
      </WithI18n>
    ),
  ],
};

export default preview;
