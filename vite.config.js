import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from 'vite-plugin-imagemin';

// Configuration de Vite
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      webp: { quality: 75 },
      avif: { quality: 50 },
    }),
  ],

  // Configuration de Vitest pour les tests
  test: {
    environment: "jsdom", // Utilisation de jsdom pour simuler le DOM
    globals: true,         // Activation des fonctions globales comme `expect`
    setupFiles: "./vitest.setup.js", // Fichier de configuration avant les tests
    include: ["src/**/*.{test,spec}.{js,ts,tsx}"], // Où Vitest cherche les fichiers de test
    exclude: ["node_modules/**/*"], // Exclure les fichiers dans node_modules
  },
});
