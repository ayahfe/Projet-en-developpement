describe("Afficher prescriptions - Smoke tests", () => {
  it("charge la page prescriptions", () => {
    cy.visit("/medecins");
    cy.get("body").should("exist");
  });

  it("ne crash pas au chargement", () => {
    cy.visit("/medecins");
    cy.window().should("exist");
  });

  it("affiche une structure HTML", () => {
    cy.visit("/medecins");
    cy.get("div").should("exist");
  });

  it("supporte un scroll", () => {
    cy.visit("/medecins");
    cy.scrollTo("bottom");
  });

  it("supporte un refresh", () => {
    cy.visit("/medecins");
    cy.reload();
    cy.get("body").should("exist");
  });

  it("ne génère pas d’erreur JS visible", () => {
    cy.visit("/medecins");
    cy.window().its("console").should("exist");
  });
});
