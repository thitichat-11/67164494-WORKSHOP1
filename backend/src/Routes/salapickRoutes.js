import express from 'express';
import { getSaLaPicks } from '../Controllers/salapickController.js'; 

const router = express.Router();

// เมื่อมีการเรียก GET มาที่ / (ของ route นี้) ให้ทำงานที่ getSaLaPicks
router.get('/', getSaLaPicks);

export default router;