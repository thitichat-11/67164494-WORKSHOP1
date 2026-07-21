import express from 'express';
import { getCartItems, updateCartItemQuantity } from '../Controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.get('/:userId', verifyToken, authorizeRole(1), getCartItems)
router.put('/:cart_id', verifyToken, authorizeRole(1), updateCartItemQuantity)

export default router