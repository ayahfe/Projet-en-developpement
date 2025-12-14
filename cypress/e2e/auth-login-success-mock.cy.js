describe("Auth - login success (mock)", () => {
  it("connecte et redirige vers /", () => {
    cy.mockLoginOk();
    cy.loginUI("admin@hotmail.com", "123456");
    cy.wait("@loginOk");
    cy.location("pathname").should("eq", "/");
    cy.window().then((w) => {
      expect(w.localStorage.getItem("token")).to.eq("fake-token");
    });
  });
});
