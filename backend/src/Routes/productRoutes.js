import express from 'express';
import { getProducts,createProduct } from '../controllers/productController.js';

const router = express.Router();

// เส้นทางสำหรับ GET /api/products
router.get('/', getProducts);
router.post('/', createProduct);

export default router;