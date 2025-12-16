describe("Ajouter prescription - Validation UI", () => {
  beforeEach(() => {
    cy.visit("/medecins/add");
  });

  it("ne soumet pas le formulaire vide", () => {
    cy.contains("Enregistrer").click();
    cy.get("form").should("exist");
  });

  it("permet de remplir les champs patient", () => {
    cy.get('input[name="nomInstitut"]').type("Clinique ABC");
    cy.get('input[name="nom"]').type("Doe");
    cy.get('input[name="prenom"]').type("John");
  });

  it("permet de remplir les champs prescription", () => {
    cy.get('input[name="nomMolecule"]').type("Ibuprofen");
    cy.get('input[name="force"]').type("200mg");
    cy.get('input[name="quantite"]').type("30");
  });

  it("permet de remplir la signature", () => {
    cy.get('input[name="title"]').first().type("Dr Test");
  });

  it("le formulaire reste affiché après soumission", () => {
    cy.contains("Enregistrer").click();
    cy.contains("Ajouter une Prescription");
  });
});
