describe("Navigation prescriptions - UI", () => {
  it("ouvre la page prescriptions", () => {
    cy.visit("/medecins");
    cy.get("body").should("exist");
  });

  it("ouvre la page ajout", () => {
    cy.visit("/medecins/add");
    cy.get("body").should("exist");
  });

  it("ouvre la page modification", () => {
    cy.visit("/medecins/modify/1");
    cy.get("body").should("exist");
  });

  it("ouvre la page suppression", () => {
    cy.visit("/medecins/delete");
    cy.get("body").should("exist");
  });
});
