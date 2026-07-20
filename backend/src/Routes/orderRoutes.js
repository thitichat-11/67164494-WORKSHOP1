import express from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrders);              // ดึงรายการ Order ทั้งหมด
router.put('/:id/status', updateOrderStatus); // เปลี่ยนสถานะ Order (เผื่อใช้ในอนาคต)

export default router;