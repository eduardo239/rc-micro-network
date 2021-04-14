import express from 'express';
import {
  createNewPost,
  deletePost,
  getPostById,
  getPosts,
  post_like,
  search_post,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createNewPost);
router.route('/:id').get(getPostById).delete(protect, deletePost);
router.route('/:id/like').get(post_like);
router.route('/search/:term').get(protect, search_post);

export default router;
