describe("Signup UI", () => {
  it("permet à un utilisateur de s’inscrire", () => {
    cy.visit("/signup"); // ✅ ta vraie route

    cy.get('input[name="email"]').type("testui@example.com");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirm-password"]').type("Password123!");

    cy.get('input[type="checkbox"][name="terms"]').check();
    cy.contains("Créer un compte").click();

    cy.contains(/Se connecter|Connexion/i, { timeout: 10000 })
      .should("exist");
  });
});
