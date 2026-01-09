const request = require('supertest');
const app = require('../app');
const BadgeModel = require('../models/badge.model');

describe('Badge API', () => {
  // reset data before each test
  beforeEach(async () => {
    await BadgeModel.reset();
  });

  describe('GET /badges', () => {
    it('should return all badges with status 200', async () => {
      const response = await request(app).get('/badges');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return badges with correct structure', async () => {
      const response = await request(app).get('/badges');
      const badge = response.body[0];
      expect(badge).toHaveProperty('id');
      expect(badge).toHaveProperty('title');
      expect(badge).toHaveProperty('skill');
      expect(badge).toHaveProperty('userId');
      expect(badge).toHaveProperty('issuedAt');
    });
  });

  describe('GET /badges?skill=<skill>', () => {
    it('should filter badges by skill query param', async () => {
      const response = await request(app).get('/badges?skill=ai');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      
      // Check all returned badges have the requested skill
      response.body.forEach(badge => {
        expect(badge.skill).toBe('ai');
      });
    });

    it('should return empty array for non-existent skill', async () => {
      const response = await request(app).get('/badges?skill=nonexistent');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should filter for nodejs skill', async () => {
      const response = await request(app).get('/badges?skill=nodejs');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      response.body.forEach(badge => {
        expect(badge.skill).toBe('nodejs');
      });
    });
  });

  describe('POST /badges', () => {
    it('should create a new badge with status 201', async () => {
      const newBadge = {
        title: 'Backend Developer',
        skill: 'nodejs',
        userId: '123'
      };

      const response = await request(app)
        .post('/badges')
        .send(newBadge);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newBadge.title);
      expect(response.body.skill).toBe(newBadge.skill);
      expect(response.body.userId).toBe(newBadge.userId);
      expect(response.body).toHaveProperty('issuedAt');
    });

    it('should return 400 when title is missing', async () => {
      const invalidBadge = {
        skill: 'nodejs',
        userId: '123'
      };

      const response = await request(app)
        .post('/badges')
        .send(invalidBadge);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'missing required fields');
    });

    it('should return 400 when skill is missing', async () => {
      const invalidBadge = {
        title: 'Backend Developer',
        userId: '123'
      };

      const response = await request(app)
        .post('/badges')
        .send(invalidBadge);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'missing required fields');
    });

    it('should return 400 when userId is missing', async () => {
      const invalidBadge = {
        title: 'Backend Developer',
        skill: 'nodejs'
      };

      const response = await request(app)
        .post('/badges')
        .send(invalidBadge);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'missing required fields');
    });

    it('should return 400 when all required fields are missing', async () => {
      const invalidBadge = {};

      const response = await request(app)
        .post('/badges')
        .send(invalidBadge);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should create multiple badges for same user', async () => {
      const badge1 = {
        title: 'Cloud Computing',
        skill: 'aws',
        userId: '1'
      };

      const badge2 = {
        title: 'DevOps Expert',
        skill: 'docker',
        userId: '1'
      };

      const response1 = await request(app).post('/badges').send(badge1);
      const response2 = await request(app).post('/badges').send(badge2);

      expect(response1.status).toBe(201);
      expect(response2.status).toBe(201);
      expect(response1.body.userId).toBe(response2.body.userId);
    });
  });
});
