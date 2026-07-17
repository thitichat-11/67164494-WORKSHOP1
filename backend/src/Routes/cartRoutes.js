import express from 'express';
import { getCartItems, updateCartItemQuantity } from '../Controllers/cartController.js';

const router = express.Router()

router.get('/:userId', getCartItems)
router.put('/:cart_id', updateCartItemQuantity)

export default router