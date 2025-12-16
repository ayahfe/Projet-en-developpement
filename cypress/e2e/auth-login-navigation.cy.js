describe("Login - navigation", () => {
  it("redirige vers signup via le lien", () => {
    cy.visit("/login");
    cy.contains("Créer un compte").click();
    cy.url().should("include", "/signup");
  });
});
