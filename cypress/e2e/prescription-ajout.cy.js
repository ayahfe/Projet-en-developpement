describe('Prescription - Ajout', () => {
  beforeEach(() => {
    cy.visit('/medecins/add'); // Assurez-vous que la route est correcte
    cy.get('h2').should('have.text', 'Ajouter une Prescription'); // Vérification que le titre est bien visible
  });

  it('affiche le formulaire de prescription', () => {
    cy.get('form').should('exist'); // Vérifie que le formulaire est présent
  });

  it('soumet correctement le formulaire', () => {
    cy.get('input[name="nomInstitut"]').type('Institut de test');
    cy.get('input[name="date"]').type('2025-12-16');
    cy.get('input[name="ramq"]').type('RAMQ123');
    cy.get('input[name="nom"]').type('Doe');
    cy.get('input[name="prenom"]').type('John');
    cy.get('input[name="telephone"]').type('514-555-5555');
    cy.get('button[type="submit"]').click(); // Soumet le formulaire

    cy.url().should('include', '/medecins'); // Vérifie que la redirection se fait après la soumission
  });
});
