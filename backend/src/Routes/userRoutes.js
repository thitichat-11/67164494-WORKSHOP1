import express from 'express';
import { getAllUsers, updateUserStatus } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);                 // ดูข้อมูล user ทั้งหมด
router.put('/:id/status', updateUserStatus);  // ระงับ / ปลดระงับบัญชี

export default router;