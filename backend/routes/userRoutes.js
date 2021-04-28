import express from 'express';
const router = express.Router();
import {
  auth_user,
  get_user_profile,
  post_new_user,
  update_user_profile,
  get_user_by_id,
  get_all_users,
  get_posts_by_user,
  add_friend,
  delete_friend,
  delete_user,
  admin_control,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(post_new_user).get(protect, get_all_users);
router.route('/login').post(auth_user);
router
  .route('/profile')
  .get(protect, get_user_profile)
  .put(protect, update_user_profile);
router.route('/posts/:userId').get(protect, get_posts_by_user);
router.route('/:id').get(protect, get_user_by_id).delete(protect, delete_user);

export default router;
