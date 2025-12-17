// Test de connexion réussie avec mock
describe("Login avec mock", () => {
  beforeEach(() => {
    cy.resetAuth();
    cy.mockLoginOk();
    cy.visit("/login");
  });

  it("devrait se connecter avec succès", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    
    cy.wait("@loginOk");
    cy.shouldBeLoggedIn();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});

// Test de connexion échouée
describe("Login avec erreur", () => {
  beforeEach(() => {
    cy.resetAuth();
    cy.mockLoginError();
    cy.visit("/login");
  });

  it("devrait afficher une erreur", () => {
    cy.get('input[name="email"]').type("wrong@example.com");
    cy.get('input[name="password"]').type("wrong");
    cy.get('button[type="submit"]').click();
    
    cy.wait("@loginError");
    cy.contains(/connexion échouée|erreur/i).should("be.visible");
    cy.shouldBeLoggedOut();
  });
});

// Utilisation de la commande login simplifiée
describe("Avec commande login", () => {
  it("devrait se connecter", () => {
    cy.login(); // Utilise les valeurs par défaut
    cy.shouldBeLoggedIn();
  });
});

// Test signup
describe("Signup", () => {
  beforeEach(() => {
    cy.resetAuth();
    cy.mockSignupOk();
    cy.visit("/signup");
  });

  it("devrait créer un compte", () => {
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('input[name="confirmPassword"]').type("Password123!");
    cy.get('input[type="checkbox"][name="terms"]').check();
    cy.contains("Créer un compte").click();
    
    cy.wait("@signupOk");
    cy.url().should("include", "/login");
  });
});