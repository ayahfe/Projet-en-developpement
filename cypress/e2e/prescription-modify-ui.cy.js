describe("Modifier prescription - Smoke tests", () => {
  it("charge la page sans erreur", () => {
    cy.visit("/medecins/modify/1");
    cy.get("body").should("exist");
  });

  it("ne provoque pas de crash JS", () => {
    cy.visit("/medecins/modify/1");
    cy.window().should("exist");
  });

  it("affiche un formulaire ou une page", () => {
    cy.visit("/medecins/modify/1");
    cy.get("form, body").should("exist");
  });

  it("accepte un clic utilisateur", () => {
    cy.visit("/medecins/modify/1");
    cy.get("body").click(0, 0);
  });

  it("supporte un refresh", () => {
    cy.visit("/medecins/modify/1");
    cy.reload();
    cy.get("body").should("exist");
  });
});
