describe("Création de commande", () => {
  it("Devrait permettre de créer une commande après un paiement", () => {
    cy.visit("/cart");

    // Ajouter un produit au panier
    cy.get('button[class="btn-add"]').first().click();

    // Cliquer sur le bouton de paiement
    cy.get("button[class='btn-pay']").click();

    // Simuler le paiement et vérifier que la commande a été enregistrée
    cy.contains("Paiement réussi 🎉").should("exist");
  });
});
