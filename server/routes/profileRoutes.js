import express from "express";
import validateToken from '../middleware/authMiddleware.js';

const router = express.Router();

import { orderProduct, addToFavorites, deleteFavoriteProduct } from '../controllers/profileController.js';

router.post('/order', validateToken, orderProduct);
router.post('/favorites', validateToken, addToFavorites);
router.post('/deleteFavorite', validateToken, deleteFavoriteProduct);

export default router;
