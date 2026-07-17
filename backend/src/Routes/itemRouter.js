import express from 'express';
import { getItemById, addToCart, getCartItems, updateCartItemQuantity } from '../controllers/itemController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router()

// ดูสินค้าทั่วไป ไม่ล้อคอินก็ดูได้
router.get('/:id', getItemById) 

router.post('/add', verifyToken, addToCart)
router.get('/cart', verifyToken, getCartItems)
router.put('/update/:cart_id', verifyToken, updateCartItemQuantity)

export default router