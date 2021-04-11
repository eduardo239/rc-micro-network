import express from 'express';
import {
  createNewPost,
  deletePost,
  getPostById,
  getPosts,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createNewPost);
router.route('/:id').get(getPostById).delete(protect, deletePost);

export default router;
