it("active la classe active sur le lien courant", () => {
  cy.visit("/pharmacie");
  cy.get('a[href="/pharmacie"]').should("have.class", "active");
});
