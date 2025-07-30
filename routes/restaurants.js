import express from 'express';
import { getRestaurants, insertRestaurant, deleteRestaurant, updateRestaurant } from '../controllers/restaurantsController.js';
const router = express.Router();

router.get('/', getRestaurants);
router.post('/', insertRestaurant);
router.delete('/:id', deleteRestaurant);
router.put('/:id', updateRestaurant);


export default router;
