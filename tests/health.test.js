const request = require('supertest');
const app = require('../app');

describe('Health Check API', () => {
  describe('GET /health', () => {
    it('should return status 200', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
    });

    it('should return JSON with status ok', async () => {
      const response = await request(app).get('/health');
      expect(response.body).toEqual({ status: 'ok' });
    });

    it('should have content-type application/json', async () => {
      const response = await request(app).get('/health');
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });
});
