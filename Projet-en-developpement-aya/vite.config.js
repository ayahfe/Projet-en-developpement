import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react({
      include: [/\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/],
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      all: true,
      include: ["components/**/*.{js,jsx,ts,tsx}", "lib/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "**/*.{test,spec}.{js,jsx,ts,tsx}",
        "**/__tests__/**",
        "**/__mocks__/**",
        "**/*.d.ts",
        "node_modules/**",
        "dist/**",
        ".next/**",
        "coverage/**",
      ],
    },
  },
});
