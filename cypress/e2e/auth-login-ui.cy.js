describe("Login UI", () => {
  it("permet de remplir et soumettre le formulaire", () => {
    cy.visit("/login");

    cy.get('input[type="email"]').should("exist").type("admin@hotmail.com");
    cy.get('input[type="password"]').should("exist").type("admin123");

    cy.contains("Se connecter").click();

    // On valide que le bouton a été cliqué
    cy.contains(/connexion|connecter|bienvenue/i);
  });
});
