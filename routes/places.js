import express from 'express';
import { getPlaces, insertPlace, deletePlace, updatePlace } from '../controllers/placesController.js';
const router = express.Router();

router.get('/', getPlaces);
router.post('/', insertPlace);
router.delete('/:id', deletePlace);
router.put('/:id', updatePlace);

export default router;
