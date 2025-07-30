import express from 'express';
import { getEvents, insertEvents, deleteEvent, updateEvent } from '../controllers/eventsController.js';
const router = express.Router();

router.get('/', getEvents);
router.post('/', insertEvents);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

export default router;
