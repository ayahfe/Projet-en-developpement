import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: ['cypress/e2e/**/*.cy.js', 'src/backend/controlleurs/**/*.test.js'],  // Moved outside setupNodeEvents
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
