import express from 'express';
import {
  post_new_post,
  delete_post,
  get_post_by_id,
  get_all_posts,
  post_like,
  post_search,
  get_posts_by_user,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../routes/uploadRoutes.js';

const router = express.Router();

router
  .route('/')
  .get(get_all_posts)
  .post(upload.single('image'), post_new_post);
router.route('/:id').get(get_post_by_id).delete(protect, delete_post);
router.route('/:id/like').get(protect, post_like);
router.route('/search/:term').get(protect, post_search);
router.route('/my/:userId').get(protect, get_posts_by_user);

export default router;
