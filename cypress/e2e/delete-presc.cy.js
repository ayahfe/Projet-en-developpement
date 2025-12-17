describe("Suppression de prescription", () => {
  it("Devrait permettre de supprimer une prescription", () => {
    cy.visit("/medecins");

    // Cliquer sur le bouton de suppression de la prescription avec l'ID 1
    cy.get('button[class="button-rx-delete"]').first().click();

    // Vérifier que la prescription a été supprimée
    cy.contains("Prescription supprimée").should("exist");
  });
});
