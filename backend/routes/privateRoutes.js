import express from 'express';
import { post_new_pm } from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, post_new_pm);

export default router;
