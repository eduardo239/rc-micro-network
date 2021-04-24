import express from 'express';
import {
  post_new_pm,
  get_all_pm,
  get_pm_by_user,
} from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, get_all_pm).post(protect, post_new_pm);
router.route('/:userId').get(protect, get_pm_by_user);

export default router;
