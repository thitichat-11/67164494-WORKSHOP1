import express from 'express';
import { getItemById, addToCart, getCartItems, updateCartItemQuantity } from '../controllers/itemController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.post('/add', verifyToken, authorizeRole(1), addToCart)
router.get('/cart', verifyToken, authorizeRole(1), getCartItems)
router.put('/update/:cart_id', verifyToken, updateCartItemQuantity)

// ดูสินค้าทั่วไป ไม่ล้อคอินก็ดูได้
router.get('/:id', getItemById) 

export default router