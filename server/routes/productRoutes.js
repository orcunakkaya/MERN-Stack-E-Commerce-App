import express from "express";
import validateToken from '../middleware/authMiddleware.js';
const router = express.Router();

import { createProduct, getProducts, getSingleProduct } from '../controllers/productController.js';

router.post('/new-product', createProduct);
router.get('/products/:product_category', getProducts);
router.get('/:id', getSingleProduct);


export default router;