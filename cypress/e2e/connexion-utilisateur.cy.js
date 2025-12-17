describe("Connexion utilisateur", () => {
  it('Devrait permettre de se connecter avec un utilisateur valide', () => {
    cy.visit('/connexion');  // Visitez la page de connexion

    // Attendez que l'élément email soit visible
    cy.get('input[name="email"]', { timeout: 15000 }).should('be.visible');
    
    // Tapez l'email dans le champ
    cy.get('input[name="email"]').type('utilisateur@example.com');
    
    // Tapez le mot de passe
    cy.get('input[name="password"]').type('motdepassevalide');
    
    // Soumettez le formulaire
    cy.get('form').submit();

    // Vérifiez que la connexion a réussi
    cy.url().should('include', '/accueil');
    cy.get('.bienvenue').should('be.visible');  // Ajustez selon votre structure
  });
});
