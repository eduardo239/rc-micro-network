import express from 'express';
const router = express.Router();
import { addFriend, delete_friend } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addFriend).delete(protect, delete_friend);

export default router;
