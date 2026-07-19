import express from 'express';
const router = express.Router();

import { UserSingup } from '../controllers/singupController.js';

router.post('/', UserSingup);


export default router;