describe("Ajouter prescription - UI (structure)", () => {
  beforeEach(() => {
    cy.visit("/medecins/add");
  });

  it("charge la page", () => {
    cy.get("body").should("exist");
  });

  it("contient un formulaire", () => {
    cy.get("form").should("exist");
  });

  it("contient plusieurs inputs", () => {
    cy.get("input").its("length").should("be.greaterThan", 5);
  });

  it("contient un bouton", () => {
    cy.get("button").should("exist");
  });

  it("ne crash pas au submit", () => {
    cy.get("form").submit();
    cy.get("body").should("exist");
  });
});
