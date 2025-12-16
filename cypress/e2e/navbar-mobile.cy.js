describe("Navbar - mobile menu", () => {
  beforeEach(() => {
    cy.viewport(375, 667); // iPhone
    cy.visit("/");
  });

  it("ouvre et ferme le menu burger", () => {
    cy.get(".burger").should("be.visible").click();
    cy.get(".mobile-menu").should("exist");
    cy.get(".burger").click();
    cy.get(".mobile-menu").should("not.exist");
  });

  it("clique sur un lien mobile", () => {
    cy.get(".burger").click();
    cy.contains(".mobile-menu a", "Pharmacie").click();
    cy.location("pathname").should("include", "/pharmacie");
  });
});
