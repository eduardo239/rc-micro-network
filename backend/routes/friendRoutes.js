import express from 'express';
const router = express.Router();
import { add_friend, delete_friend } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, add_friend).delete(protect, delete_friend);

export default router;
