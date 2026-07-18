import express from 'express';
const router = express.Router();

// const accountController = require('../controllers/accountController');
import { accountOverview } from '../controllers/accountController.js';

//  middleware ตรวจสอบ token
import { verifyToken } from '../middleware/authMiddleware.js';


export default router;