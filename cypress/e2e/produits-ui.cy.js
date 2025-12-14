describe("Produits - UI", () => {
  beforeEach(() => {
    cy.visit("/pharmacie");
  });

  it("affiche des produits (nom)", () => {
    cy.contains("Advil").should("exist");
    cy.contains("Tylenol").should("exist");
  });

  it("affiche un prix", () => {
    cy.contains("$").should("exist");
  });

  it("affiche des images de produits", () => {
    cy.get("img").should("have.length.at.least", 1);
  });
});
