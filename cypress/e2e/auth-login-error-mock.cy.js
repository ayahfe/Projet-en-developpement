describe("Auth - login erreur (mock)", () => {
  it("affiche une erreur quand identifiants invalides", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 401,
      body: { error: "Identifiants invalides" },
    });

    cy.visit("/login");
    cy.get('input[type="email"]').type("bad@mail.com");
    cy.get('input[type="password"]').type("bad");
    cy.contains("button", /se connecter/i).click();

    cy.on("window:alert", (txt) => {
      expect(txt.toLowerCase()).to.include("connexion");
    });
  });
});
