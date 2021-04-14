import express from 'express';
import {
  new_comment,
  getById,
  deleteCommentById,
  get_all_comments,
} from '../controllers/commentController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .post(protect, new_comment)
  .get(protect, getById)
  .delete(protect, deleteCommentById);
router.route('/').get(protect, admin, get_all_comments);
export default router;
