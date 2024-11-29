/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "./coverage/**",
        "./src/assets/**",
        "./**/*.config.{js,ts}",
        "./**/*.d.ts",
        "./src/routeTree.gen.ts",
        "./src/context/**/provider.tsx",
      ],
    },
  },
});
