import request from 'supertest';
import app from '../../index.js';

describe('API Routes', () => {
  describe('GET /', () => {
    it('should return API status message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.text).toContain('API Nkwagabon fonctionne');
    });
  });

  describe('GET /restaurants', () => {
    it('should return restaurants data', async () => {
      const response = await request(app).get('/restaurants');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /events', () => {
    it('should return events data', async () => {
      const response = await request(app).get('/events');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /places', () => {
    it('should return places data', async () => {
      const response = await request(app).get('/places');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
}); 