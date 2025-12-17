it('Devrait afficher les produits', () => {
  cy.visit('/produits');  // Visitez la page des produits

  // Attendre que l'élément .produit-list soit visible
  cy.get('.produit-list', { timeout: 15000 }).should('be.visible');

  // Vérifier que les produits sont bien présents
  cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0);

  // Vérifier que chaque produit a un nom, un prix et une image
  cy.get('.product-card').each(($el) => {
    cy.wrap($el).find('.product-name').should('be.visible');
    cy.wrap($el).find('.product-price').should('be.visible');
    cy.wrap($el).find('img').should('be.visible');
  });
});
