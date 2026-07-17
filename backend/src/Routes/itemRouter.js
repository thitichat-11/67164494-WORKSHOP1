import express from 'express';
import { getItemById, addToCart } from '../controllers/itemController.js';

const router = express.Router()

router.get('/:id', getItemById)
router.post('/add', addToCart)

export default router