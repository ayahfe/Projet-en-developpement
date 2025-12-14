describe("Login - affichage", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  it("affiche le champ email", () => {
    cy.get('input[type="email"]').should("exist");
  });

  it("affiche le champ mot de passe", () => {
    cy.get('input[type="password"]').should("exist");
  });

  it("affiche le bouton se connecter", () => {
    cy.contains("Se connecter").should("exist");
  });

  it("affiche le lien créer un compte", () => {
    cy.contains("Créer un compte").should("exist");
  });
});
