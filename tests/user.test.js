const request = require('supertest');
const app = require('../app');
const UserModel = require('../models/user.model');

describe('User API', () => {
  // reset data before each test
  beforeEach(async () => {
    await UserModel.reset();
  });

  describe('GET /users', () => {
    it('should return all users with status 200', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return users with correct structure', async () => {
      const response = await request(app).get('/users');
      const user = response.body[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('createdAt');
    });
  });

  describe('GET /users/:id', () => {
    it('should return user by ID with status 200', async () => {
      const response = await request(app).get('/users/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('name');
    });

    it('should return 400 when user not found', async () => {
      const response = await request(app).get('/users/999');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'user not found');
    });
  });

  describe('GET /users?role=<role>', () => {
    it('should filter users by role query param', async () => {
      const response = await request(app).get('/users?role=learner');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      // Check all returned users have the requested role
      response.body.forEach(user => {
        expect(user.role).toBe('learner');
      });
    });

    it('should return empty array for non-existent role', async () => {
      const response = await request(app).get('/users?role=nonexistent');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should filter for admin role', async () => {
      const response = await request(app).get('/users?role=admin');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      response.body.forEach(user => {
        expect(user.role).toBe('admin');
      });
    });
  });

  describe('POST /users', () => {
    it('should create a new user with status 201', async () => {
      const newUser = {
        name: 'Amit Patel',
        email: 'amit@email.com',
        role: 'learner'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.role).toBe(newUser.role);
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should create user with default role when role not provided', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@email.com'
      };

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.role).toBe('learner');
    });

    it('should return 400 when name is missing', async () => {
      const invalidUser = {
        email: 'test@email.com'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'missing required fields');
    });

    it('should return 400 when email is missing', async () => {
      const invalidUser = {
        name: 'Test User'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'missing required fields');
    });

    it('should return 400 when both name and email are missing', async () => {
      const invalidUser = {
        role: 'learner'
      };

      const response = await request(app)
        .post('/users')
        .send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});
