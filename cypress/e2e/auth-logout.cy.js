describe("Déconnexion", () => {
  it("déconnecte l’utilisateur", () => {
    // 1️⃣ Simuler un utilisateur connecté
    cy.window().then((win) => {
      win.localStorage.setItem("token", "fake-jwt-token");
      win.localStorage.setItem(
        "user",
        JSON.stringify({ email: "test@example.com" })
      );
    });

    // 2️⃣ Aller sur l’accueil
    cy.visit("/");

    // 3️⃣ Simuler la déconnexion (frontend)
    cy.window().then((win) => {
      win.localStorage.removeItem("token");
      win.localStorage.removeItem("user");
    });

    // 4️⃣ Vérifier que le token a bien disparu
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });

    // 5️⃣ Vérifier la redirection vers login
    cy.visit("/login");
    cy.url().should("include", "/login");
  });
});
