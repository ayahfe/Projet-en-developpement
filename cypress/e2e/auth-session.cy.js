describe("Session utilisateur", () => {
  it("rafraîchit la page sans erreur", () => {
    cy.visit("/login");

    cy.reload();

    cy.get("body").should("exist");
  });
});
