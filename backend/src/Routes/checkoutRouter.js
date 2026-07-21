import express from 'express';
const router = express.Router();

//  middleware ตรวจสอบ token
import { verifyToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { UsersCheckout } from '../controllers/checkoutController.js';
import upload from '../middleware/uploadMiddleware.js';


router.post('/', verifyToken, upload.single('payment_slip'), UsersCheckout);


export default router;