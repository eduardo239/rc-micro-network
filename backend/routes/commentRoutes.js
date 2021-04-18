import express from 'express';
import {
  post_new_comment,
  get_comment_by_id,
  delete_comment_by_id,
  get_all_comments,
} from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .post(protect, post_new_comment)
  .get(protect, get_comment_by_id)
  .delete(protect, delete_comment_by_id);
router.route('/').get(protect, admin, get_all_comments);
export default router;
