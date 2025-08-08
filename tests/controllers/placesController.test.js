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
import { getPlaces, insertPlace, deletePlace, updatePlace } from '../../controllers/placesController.js';
import { supabase } from '../../supabase.js';

describe('Places Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPlaces', () => {
    it('should return places data successfully', async () => {
      const mockData = [{ id: 1, name: 'Place 1' }, { id: 2, name: 'Place 2' }];
      supabase.select.mockResolvedValue({ data: mockData, error: null });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getPlaces(req, res);

      expect(supabase.from).toHaveBeenCalledWith('places');
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

      await getPlaces(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('insertPlace', () => {
    it('should insert place successfully', async () => {
      const mockData = { id: 1, name: 'New Place', description: 'A beautiful place' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = {
        body: {
          nom: 'New Place',
          description: 'A beautiful place',
          localisation: 'Paris, France',
          image: 'place.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await insertPlace(req, res);

      expect(supabase.from).toHaveBeenCalledWith('places');
      expect(supabase.insert).toHaveBeenCalledWith([{
        name: 'New Place',
        description: 'A beautiful place',
        adress: 'Paris, France',
        photo: 'place.jpg'
      }]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Lieu ajouté',
        data: [mockData]
      });
    });
  });

  describe('deletePlace', () => {
    it('should delete place successfully', async () => {
      const mockData = { id: 1, name: 'Deleted Place' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deletePlace(req, res);

      expect(supabase.from).toHaveBeenCalledWith('places');
      expect(supabase.delete).toHaveBeenCalled();
      expect(supabase.eq).toHaveBeenCalledWith('id', '1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Lieu supprimé',
        data: [mockData]
      });
    });
  });

  describe('updatePlace', () => {
    it('should update place successfully', async () => {
      const mockData = { id: 1, name: 'Updated Place' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = {
        params: { id: '1' },
        body: {
          nom: 'Updated Place',
          description: 'An updated beautiful place',
          localisation: 'London, UK',
          image: 'new-place.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updatePlace(req, res);

      expect(supabase.from).toHaveBeenCalledWith('places');
      expect(supabase.update).toHaveBeenCalledWith({
        name: 'Updated Place',
        description: 'An updated beautiful place',
        adress: 'London, UK',
        photo: 'new-place.jpg'
      });
      expect(supabase.eq).toHaveBeenCalledWith('id', '1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Lieu mis à jour',
        data: [mockData]
      });
    });
  });
}); 