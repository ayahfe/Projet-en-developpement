import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      webp: { quality: 75 },
      avif: { quality: 50 },
    }),
  ],
  
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
  },
});
