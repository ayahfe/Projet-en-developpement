it('Devrait permettre de supprimer une prescription', () => {
  cy.visit('/medecins');  // Visitez la page des prescriptions

  // Attendez que la liste de prescriptions soit chargée
  cy.get('.prescription-list', { timeout: 10000 }).should('be.visible');

  // Cliquez sur le bouton de suppression de la première prescription
  cy.get('.button-rx-delete').first().click();

  // Vérifiez que la prescription a été supprimée
  cy.get('.prescription-list').should('not.contain', 'Prescription supprimée');
});
