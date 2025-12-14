describe('Auth Login API Tests', () => {
  const baseUrl = 'http://localhost:4000';

  beforeEach(() => {
    cy.request('POST', `${baseUrl}/api/reset`);
  });

  it('should login successfully with correct credentials', () => {
    // Signup d'abord
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'login@test.com',
        password: 'password123'
      }
    });

    // Login
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: {
        email: 'login@test.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body.user.email).to.eq('login@test.com');
    });
  });

  it('should fail login with wrong password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'wrongpass@test.com',
        password: 'password123'
      }
    });

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: {
        email: 'wrongpass@test.com',
        password: 'badpassword'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.error).to.eq('Identifiants invalides');
    });
  });

  it('should return user info with valid token', () => {
    let token;

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/signup`,
      body: {
        email: 'me@test.com',
        password: 'password123'
      }
    }).then((res) => {
      token = res.body.token;

      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.eq('me@test.com');
      });
    });
  });

  it('should deny access to /me without token', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/auth/me`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});