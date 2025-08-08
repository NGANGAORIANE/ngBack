import express from 'express';
import { getMenusByRestaurant, insertMenu, deleteMenu, updateMenu } from '../controllers/menuController.js';
const router = express.Router();
router.get('/:restaurant_id', getMenusByRestaurant);
router.post('/', insertMenu);
router.delete('/:id', deleteMenu);
router.put('/:id', updateMenu);
export default router;