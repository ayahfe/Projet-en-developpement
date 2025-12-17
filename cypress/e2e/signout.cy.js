it('Devrait permettre de se déconnecter', () => {
  // Se connecter d'abord
  cy.login('user@example.com', 'password123'); // Utilisez une méthode de connexion personnalisée si nécessaire

  // Vérifiez que le bouton de déconnexion est visible
  cy.get('button.logout-btn', { timeout: 10000 }).should('be.visible');

  // Cliquez sur le bouton de déconnexion
  cy.get('button.logout-btn').click();

  // Vérifiez que l'utilisateur est redirigé vers la page de connexion
  cy.url().should('include', '/login');
});
