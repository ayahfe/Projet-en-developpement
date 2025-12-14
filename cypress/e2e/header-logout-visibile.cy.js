describe("Header - logout visible", () => {
  it("montre Déconnexion si connecté", () => {
    // simule session déjà connectée
    cy.window().then((w) => w.localStorage.setItem("token", "fake-token"));
    cy.intercept("GET", "**/api/auth/me", { statusCode: 200, body: { email: "admin@hotmail.com" } });
    cy.visit("/");
    cy.contains("button", "Déconnexion").should("exist");
  });

  it("montre Connexion si pas connecté", () => {
    cy.visit("/");
    cy.contains("button", "Connexion").should("exist");
  });
});
