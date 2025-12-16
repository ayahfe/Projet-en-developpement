describe("Ordonnances - liste", () => {
  it("affiche le titre Prescriptions", () => {
    cy.visit("/ordonnances");
    cy.contains(/prescriptions/i).should("exist");
  });

  it("affiche le bouton Ajouter une prescription", () => {
    cy.visit("/ordonnances");
    cy.contains("button", /ajouter une prescription/i).should("exist");
  });

  it("affiche au moins une prescription (id + institut)", () => {
    cy.visit("/ordonnances");
    cy.contains(/Nom Institut/i).should("exist");
    cy.contains(/id/i).should("exist");
  });

  it("chaque prescription a Modifier et Supprimer", () => {
    cy.visit("/ordonnances");
    cy.contains("button", /modifier/i).should("exist");
    cy.contains("button", /supprimer/i).should("exist");
  });
});
