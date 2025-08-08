import express from 'express';
import {addFavori, getFavorisByUser, removeFavori} from '../controllers/favorisController.js';  
const router = express.Router();
router.post('/', addFavori);
router.get('/:user_id', getFavorisByUser);
router.delete('/', removeFavori);
export default router;