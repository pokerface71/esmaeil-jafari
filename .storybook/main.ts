import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../docs/**/*.mdx",
    "../components/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  staticDirs: ["../public"],
  async viteFinal(viteConfig) {
    const path = await import("node:path");
    const root = path.resolve(import.meta.dirname ?? ".", "..");
    const bareAliases = [
      { find: /^lib\//, replacement: `${root}/lib/` },
      { find: /^components\//, replacement: `${root}/components/` },
      { find: /^styles\//, replacement: `${root}/styles/` },
      { find: /^@components\//, replacement: `${root}/components/` },
      { find: /^@styles\//, replacement: `${root}/styles/` },
      {
        find: /^@design-system\//,
        replacement: `${root}/components/design-system/`
      }
    ];
    const existing = viteConfig.resolve?.alias;
    const existingArray = Array.isArray(existing)
      ? existing
      : existing
        ? Object.entries(existing).map(([find, replacement]) => ({
            find,
            replacement: replacement as string
          }))
        : [];
    return {
      ...viteConfig,
      resolve: {
        ...viteConfig.resolve,
        alias: [...bareAliases, ...existingArray]
      }
    };
  }
};
export default config;
