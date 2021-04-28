import express from 'express';
const router = express.Router();
import { admin_control } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/stats').get(protect, admin, admin_control);

export default router;
