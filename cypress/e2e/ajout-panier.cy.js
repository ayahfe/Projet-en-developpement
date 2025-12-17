it('Devrait permettre d\'ajouter un produit au panier', () => {
  cy.visit('/');  // Assurez-vous de visiter la bonne page

  // Vérifiez si le bouton existe dans le DOM
  cy.get('.btn-add').should('exist');  // Cela vérifie l'existence de l'élément dans le DOM

  // Attendez que le bouton soit visible
  cy.get('.btn-add', { timeout: 10000 }).should('be.visible');

  // Cliquez sur le bouton pour ajouter au panier
  cy.get('.btn-add').click();

  // Vérifiez que l'élément a été ajouté
  cy.get('.cart-count').should('contain', '1');
});
