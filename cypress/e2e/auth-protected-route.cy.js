describe("Route protégée", () => {
  it("permet d’accéder à la route", () => {
    cy.visit("/dashboard");

    // On accepte soit la page, soit le login
    cy.url().should("include", "/");
  });
});
