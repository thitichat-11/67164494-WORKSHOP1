import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// เส้นทางสำหรับ GET /api/products
router.get('/', getProducts);

export default router;