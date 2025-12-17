describe('Panier - Interaction', () => {
  beforeEach(() => {
    cy.visit('/'); // Assurez-vous de visiter la page d'accueil des produits
    cy.get('h2').contains('Pharmacie').should('be.visible'); // Vérifie la présence de la section pharmacie
  });

  it('ajoute un produit au panier', () => {
    cy.get('.produit-card').first().find('button').click(); // Clique sur le bouton "Ajouter au panier" du premier produit
    cy.get('.cart-btn').click(); // Clique sur l'icône du panier
    cy.get('.cart-count').should('contain', '1'); // Vérifie que le nombre de produits dans le panier est bien de 1
  });

  it('vide le panier', () => {
    cy.get('.produit-card').first().find('button').click(); // Ajoute un produit au panier
    cy.get('.cart-btn').click(); // Ouvre le panier
    cy.get('.btn-clear-cart').click(); // Clique sur le bouton pour vider le panier
    cy.get('.cart-count').should('contain', '0'); // Vérifie que le panier est vide
  });
});
