describe("Ajouter prescription - formulaire", () => {
  beforeEach(() => cy.visit("/medecins/add"));

  it("affiche les sections", () => {
    cy.contains(/Informations Patient/i).should("exist");
    cy.contains(/Informations Prescription/i).should("exist");
    cy.contains(/Signature/i).should("exist");
  });

  it("tous les champs requis existent", () => {
    cy.get("input[required]").should("have.length.at.least", 10);
  });

  it("peut remplir et soumettre sans crash", () => {
    cy.get('input[name="nomInstitut"]').type("Test Clinique");
    cy.get('input[name="date"]').type("2025-12-14");
    cy.get('input[name="ramq"]').type("TEST12345678");
    cy.get('input[name="nom"]').type("Nom");
    cy.get('input[name="prenom"]').type("Prenom");
    cy.get('input[name="telephone"]').type("5145550000");
    cy.get('input[name="nomMolecule"]').type("Advil");
    cy.get('input[name="force"]').type("200 mg");
    cy.get('input[name="quantite"]').type("30");
    cy.get('input[name="renouvellement"]').type("1");
    cy.get('input[name="posologie"]').type("1/jour");

    cy.contains("button", /enregistrer/i).click();
    cy.contains(/ajouter une prescription/i).should("exist"); // reste sur page => stable
  });
});
