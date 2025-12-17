describe("Création de prescription", () => {
  it("Devrait permettre de créer une nouvelle prescription", () => {
    cy.visit("/medecins/add");

    // Remplir le formulaire de prescription
    cy.get("input[name='nomInstitut']").type("Clinique du Vieux-Port");
    cy.get("input[name='date']").type("2025-10-15");
    cy.get("input[name='ramq']").type("TREMB13579246");
    cy.get("input[name='nom']").type("Tremblay");
    cy.get("input[name='prenom']").type("Luc");
    cy.get("input[name='telephone']").type("514-555-7777");
    cy.get("input[name='nomMolecule']").type("Ventolin");
    cy.get("input[name='force']").type("100 µg/dose");
    cy.get("input[name='quantite']").type("1");
    cy.get("input[name='renouvellement']").type("2");
    cy.get("input[name='posologie']").type("2 inhalations toutes les 4 heures au besoin");
    cy.get("input[name='nomMedecin']").type("Dr. Nadia Roy");
    cy.get("input[name='license']").type("MD45678");

    // Soumettre le formulaire
    cy.get("button[type='submit']").click();

    // Vérifier que la prescription a bien été ajoutée
    cy.contains("Prescription ajoutée").should("exist");
  });
});
