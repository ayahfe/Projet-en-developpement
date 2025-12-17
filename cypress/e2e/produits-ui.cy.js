describe("Produits - UI", () => {
  beforeEach(() => {
    cy.visit("/produits"); // Try different routes: /produits, /pharmacy, /shop
  });

  it("affiche des produits", () => {
    // Check if any product name exists
    cy.get('.produit-card', { timeout: 10000 }).should('have.length.at.least', 1);
    cy.get('.produit-card h3').first().should('exist');
  });

  it("affiche un prix", () => {
    cy.get('.produit-card', { timeout: 10000 }).should('exist');
    cy.get('.produit-card').first().find('strong').should('exist');
  });

  it("affiche des images de produits", () => {
    cy.get('.produit-card img', { timeout: 10000 }).should('have.length.at.least', 1);
  });
});