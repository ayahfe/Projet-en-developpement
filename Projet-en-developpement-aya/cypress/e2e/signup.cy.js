// src/backend/controlleurs/signup.test.js
describe('Signup API Tests', () => {
  const baseUrl = 'http://localhost:4001';

  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/reset`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should successfully sign up a new user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('token');
      expect(response.body.user).to.have.property('id');
      expect(response.body.user.email).to.eq('test@example.com');
    });
  });

  it('should return 400 for missing email', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        password: 'password123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Email et mot de passe requis');
    });
  });

  it('should return 400 for missing password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'test@example.com'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Email et mot de passe requis');
    });
  });

  it('should return 409 for duplicate email', () => {
    // First signup
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    });

    // Attempt duplicate (case insensitive)
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'TEST@EXAMPLE.COM',
        password: 'password456'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.error).to.eq('Cet email existe déjà');
    });
  });
});