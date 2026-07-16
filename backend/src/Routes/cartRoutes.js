import express from 'express';
import { getCartItemDetail } from '../controllers/cartController.js';

const router = express.Router()

router.get('/cart/item/:id', getCartItemDetail)

export default router