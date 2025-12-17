describe("Calendrier des rendez-vous", () => {
  it("Devrait permettre de naviguer dans le calendrier et d'ajouter un rendez-vous", () => {
    cy.visit("/rendezvous");

    // Naviguer dans le calendrier
    cy.get("button[class='btn-nav']").eq(0).click(); // Naviguer vers la semaine précédente
    cy.get("button[class='btn-nav']").eq(1).click(); // Naviguer vers la semaine suivante

    // Ajouter un rendez-vous
    cy.get("button[class='btn-primary']").click();
    cy.get("input[name='patient_name']").type("Luc Tremblay");
    cy.get("input[name='email']").type("luc.tremblay@example.com");
    cy.get("select[name='doctor_name']").select("Dr. Nadia Roy");
    cy.get("input[name='date']").type("2025-10-10");
    cy.get("input[name='time']").type("10:00");

    // Soumettre le formulaire
    cy.get("button[type='submit']").click();

    // Vérifier que le rendez-vous a été ajouté
    cy.contains("Rendez-vous ajouté").should("exist");
  });
});
