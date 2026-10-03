import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "lib/**",
        "components/design-system/**",
        "!components/design-system/**/*.stories.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "components"),
      "@styles": path.resolve(__dirname, "styles"),
      "@design-system": path.resolve(__dirname, "components/design-system"),
      "@": path.resolve(__dirname, "."),
      // bare aliases used across the codebase
      components: path.resolve(__dirname, "components"),
      lib: path.resolve(__dirname, "lib"),
      styles: path.resolve(__dirname, "styles"),
    },
  },
});
