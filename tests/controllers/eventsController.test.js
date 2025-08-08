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
import { getEvents, insertEvents, deleteEvent, updateEvent } from '../../controllers/eventsController.js';
import { supabase } from '../../supabase.js';

describe('Events Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getEvents', () => {
    it('should return events data successfully', async () => {
      const mockData = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
      supabase.select.mockResolvedValue({ data: mockData, error: null });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getEvents(req, res);

      expect(supabase.from).toHaveBeenCalledWith('events');
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

      await getEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('insertEvents', () => {
    it('should insert event successfully', async () => {
      const mockData = { id: 1, name: 'New Event', date: '2024-01-01' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = {
        body: {
          titre: 'New Event',
          date: '2024-01-01',
          lieu: 'Paris',
          image: 'image.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await insertEvents(req, res);

      expect(supabase.from).toHaveBeenCalledWith('events');
      expect(supabase.insert).toHaveBeenCalledWith([{
        name: 'New Event',
        date: '2024-01-01',
        adress: 'Paris',
        photo: 'image.jpg'
      }]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Événement ajouté',
        data: [mockData]
      });
    });
  });

  describe('deleteEvent', () => {
    it('should delete event successfully', async () => {
      const mockData = { id: 1, name: 'Deleted Event' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteEvent(req, res);

      expect(supabase.from).toHaveBeenCalledWith('events');
      expect(supabase.delete).toHaveBeenCalled();
      expect(supabase.eq).toHaveBeenCalledWith('id', '1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Événement supprimé',
        data: [mockData]
      });
    });
  });

  describe('updateEvent', () => {
    it('should update event successfully', async () => {
      const mockData = { id: 1, name: 'Updated Event' };
      supabase.select.mockResolvedValue({ data: [mockData], error: null });

      const req = {
        params: { id: '1' },
        body: {
          titre: 'Updated Event',
          date: '2024-01-01',
          lieu: 'Paris',
          image: 'new-image.jpg'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateEvent(req, res);

      expect(supabase.from).toHaveBeenCalledWith('events');
      expect(supabase.update).toHaveBeenCalledWith({
        name: 'Updated Event',
        date: '2024-01-01',
        adress: 'Paris',
        photo: 'new-image.jpg'
      });
      expect(supabase.eq).toHaveBeenCalledWith('id', '1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'Événement mis à jour',
        data: [mockData]
      });
    });
  });
}); 