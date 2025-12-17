// cypress/support/commands.js

// 1. Mock de connexion réussie
Cypress.Commands.add("mockLoginOk", () => {
  cy.intercept("POST", "**/api/auth/login", {
    statusCode: 200,
    body: { 
      token: "fake-jwt-token-123", 
      user: { 
        id: 1, 
        email: "test@example.com",
        role: "client"
      } 
    },
  }).as("loginOk");

  cy.intercept("GET", "**/api/auth/me", {
    statusCode: 200,
    body: { 
      id: 1, 
      email: "test@example.com",
      role: "client"
    },
  }).as("meOk");
});

// 2. Mock de connexion échouée
Cypress.Commands.add("mockLoginError", () => {
  cy.intercept("POST", "**/api/auth/login", {
    statusCode: 401,
    body: { error: "Identifiants invalides" },
  }).as("loginError");
});

// 3. Login fonctionnel avec mock
Cypress.Commands.add("login", (email = "test@example.com", password = "password123") => {
  // Mock la réponse API
  cy.mockLoginOk();
  
  // Visite la page login
  cy.visit("/login");
  
  // Remplit le formulaire
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  
  // Soumet le formulaire
  cy.get('button[type="submit"]').click();
  
  // Attend la réponse mockée
  cy.wait("@loginOk");
  
  // Vérifie la redirection
  cy.url().should("not.include", "/login");
});

// 4. Login sans mock (pour tests d'intégration)
Cypress.Commands.add("loginReal", (email = "test@example.com", password = "password123") => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  
  // Attendre que l'utilisateur soit redirigé
  cy.url().should("not.include", "/login", { timeout: 10000 });
});

// 5. Déconnexion
Cypress.Commands.add("logout", () => {
  cy.intercept("POST", "**/api/auth/logout", {
    statusCode: 200,
    body: { message: "Déconnecté" },
  }).as("logoutOk");
  
  cy.get(".logout-btn").click();
  cy.wait("@logoutOk");
  
  // Vérifie qu'on est sur la page login
  cy.url().should("include", "/login");
});

// 6. Mock signup réussi
Cypress.Commands.add("mockSignupOk", () => {
  cy.intercept("POST", "**/api/auth/signup", {
    statusCode: 201,
    body: { 
      token: "fake-signup-token", 
      user: { 
        id: 2, 
        email: "newuser@example.com",
        role: "client"
      } 
    },
  }).as("signupOk");
});

// 7. Mock signup échoué
Cypress.Commands.add("mockSignupError", () => {
  cy.intercept("POST", "**/api/auth/signup", {
    statusCode: 400,
    body: { error: "Email déjà utilisé" },
  }).as("signupError");
});

// 8. Vérifier si connecté
Cypress.Commands.add("shouldBeLoggedIn", () => {
  cy.window().its("localStorage").invoke("getItem", "token").should("exist");
  cy.get(".logout-btn").should("be.visible");
});

// 9. Vérifier si déconnecté
Cypress.Commands.add("shouldBeLoggedOut", () => {
  cy.window().its("localStorage").invoke("getItem", "token").should("be.null");
  cy.get(".logout-btn").should("not.exist");
  cy.get(".btn-login").should("exist");
});

// 10. Réinitialiser l'authentification
Cypress.Commands.add("resetAuth", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("token");
  });
  cy.clearCookies();
});

// 11. Créer un utilisateur de test
Cypress.Commands.add("createTestUser", (email, password, role = "client") => {
  cy.request({
    method: "POST",
    url: "http://localhost:4000/api/auth/signup",
    body: { email, password, role },
    failOnStatusCode: false
  });
});

// 12. Supprimer un utilisateur de test
Cypress.Commands.add("deleteTestUser", (email) => {
  cy.request({
    method: "DELETE",
    url: `http://localhost:4000/api/auth/users/${email}`,
    headers: { Authorization: "Bearer admin-token" },
    failOnStatusCode: false
  });
});