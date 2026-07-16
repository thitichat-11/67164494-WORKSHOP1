import express from 'express';
import { getItemById } from '../controllers/itemController.js';

const router = express.Router()

router.get('/:id', getItemById)

export default router