import express from 'express';
import {
  post_new_comment,
  get_comment_by_id,
  delete_comment_by_id,
  get_all_comments,
  post_new_pm,
  get_all_pm,
} from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(protect, get_comment_by_id)
  .delete(protect, delete_comment_by_id);
router.route('/').get(get_all_comments).post(protect, post_new_comment);
export default router;
