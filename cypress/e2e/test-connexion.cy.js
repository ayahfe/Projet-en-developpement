// cypress/e2e/test-connexion.cy.js
describe("Connexion à l'application", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Devrait permettre de se connecter avec un utilisateur valide", () => {
    cy.get('input[name="email"]').should('exist').type("test@example.com");
    cy.get('input[name="password"]').should('exist').type("password123");
    cy.get('button[type="submit"]').click();
    
    // Add assertions for successful login
    cy.url().should('eq', Cypress.config().baseUrl + '/'); // Should redirect to home
  });

  it("Devrait afficher une erreur pour un utilisateur invalide", () => {
    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    
    // Should show error message
    cy.contains(/connexion échouée|erreur/i, { timeout: 10000 }).should('exist');
  });
});