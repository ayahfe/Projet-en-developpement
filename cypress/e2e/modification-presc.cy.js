describe("Modification de prescription", () => {
  it("Devrait permettre de modifier une prescription existante", () => {
    cy.visit("/medecins/modify/1");

    // Modifier les informations de la prescription
    cy.get("input[name='nomInstitut']").clear().type("Clinique du Parc");
    cy.get("input[name='quantite']").clear().type("10 comprimés");

    // Soumettre les modifications
    cy.get("button[type='submit']").click();

    // Vérifier que la prescription a bien été modifiée
    cy.contains("Prescription modifiée").should("exist");
  });
});
