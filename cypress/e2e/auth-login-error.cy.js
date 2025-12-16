describe("Login erreur", () => {
  it("affiche une alerte si identifiants invalides", () => {
    cy.visit("/login");

    cy.window().then(win => {
      cy.stub(win, "alert").as("alert");
    });

    cy.get('input[type="email"]').type("fake@test.com");
    cy.get('input[type="password"]').type("wrongpass");

    cy.contains("Se connecter").click();

    cy.get("@alert").should("have.been.called");
  });
});
