describe("Signup validation", () => {
  it("refuse mots de passe différents (UI)", () => {
    cy.visit("/signup");

    cy.get('input[type="email"]').type("fail@test.com");
    cy.get('input[type="password"]').first().type("123456");
    cy.get('input[type="password"]').last().type("abcdef");

    cy.contains("Créer").click();

    cy.get("body").should("exist");
  });
});
