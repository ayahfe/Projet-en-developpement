Cypress.Commands.add("mockLoginOk", () => {
  cy.intercept("POST", "**/api/auth/login", {
    statusCode: 200,
    body: { token: "fake-token", user: { email: "admin@hotmail.com" } },
  }).as("loginOk");

  cy.intercept("GET", "**/api/auth/me", {
    statusCode: 200,
    body: { email: "admin@hotmail.com" },
  }).as("meOk");
});
