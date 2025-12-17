import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration de Vite
export default defineConfig({
  plugins: [
    react(),
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
