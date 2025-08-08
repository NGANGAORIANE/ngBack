import { jest } from '@jest/globals';

// Mock the supabase module
jest.mock('../../supabase.js', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn(),
    insert: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  },
}));

// Import the controller after mocking
import { getRestaurants, insertRestaurant, deleteRestaurant, updateRestaurant } from '../../controllers/restaurantsController.js';
import { supabase } from '../../supabase.js';

describe('Restaurants Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRestaurants', () => {
    it('should return restaurants data successfully', async () => {
      const mockData = [{ id: 1, nom: 'Restaurant 1' }, { id: 2, nom: 'Restaurant 2' }];
      supabase.select.mockResolvedValue({ data: mockData, error: null });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getRestaurants(req, res);

      expect(supabase.from).toHaveBeenCalledWith('restaurants');
      expect(supabase.select).toHaveBeenCalledWith('*');
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle error when database query fails', async () => {
      const mockError = { message: 'Database error' };
      supabase.select.mockResolvedValue({ data: null, error: mockError });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getRestaurants(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('insertRestaurant', () => {
    it('should insert restaurant successfully', async () => {
      const mockData = { id: 1, nom: 'New Restaurant', speciality: 'Pizza' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = {
        body: {
          nom: 'New Restaurant',
          speciality: 'Pizza',
          description: 'Best pizza in town',
          adress: '123 Main St',
          number: '0123456789',
          photo: 'restaurant.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await insertRestaurant(req, res);

      expect(supabase.from).toHaveBeenCalledWith('restaurants');
      expect(supabase.insert).toHaveBeenCalledWith([{
        nom: 'New Restaurant',
        speciality: 'Pizza',
        description: 'Best pizza in town',
        adress: '123 Main St',
        number: '0123456789',
        photo: 'restaurant.jpg'
      }]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Restaurant ajouté',
        data: [mockData]
      });
    });
  });

  describe('deleteRestaurant', () => {
    it('should delete restaurant successfully', async () => {
      const mockData = { id: 1, nom: 'Deleted Restaurant' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteRestaurant(req, res);

      expect(supabase.from).toHaveBeenCalledWith('restaurants');
      expect(supabase.delete).toHaveBeenCalled();
      expect(supabase.eq).toHaveBeenCalledWith('id', '1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Restaurant supprimé',
        data: [mockData]
      });
    });
  });

  describe('updateRestaurant', () => {
    it('should update restaurant successfully', async () => {
      const mockData = { id: 1, nom: 'Updated Restaurant' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = {
        params: { id: '1' },
        body: {
          nom: 'Updated Restaurant',
          speciality: 'Burgers',
          description: 'Best burgers in town',
          adress: '456 Oak St',
          number: '0987654321',
          photo: 'new-restaurant.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateRestaurant(req, res);

      expect(supabase.from).toHaveBeenCalledWith('restaurants');
      expect(supabase.update).toHaveBeenCalledWith({
        nom: 'Updated Restaurant',
        speciality: 'Burgers',
        description: 'Best burgers in town',
        adress: '456 Oak St',
        number: '0987654321',
        photo: 'new-restaurant.jpg'
      });
      expect(supabase.eq).toHaveBeenCalledWith('id', '1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Restaurant mis à jour',
        data: [mockData]
      });
    });
  });
}); 