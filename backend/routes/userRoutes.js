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
  delete_user,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(post_new_user).get(protect, admin, get_all_users);
router.route('/:id').delete(protect, admin, delete_user);
router.post('/login', auth_user);
router
  .route('/profile')
  .get(protect, get_user_profile)
  .put(protect, update_user_profile);
router.route('/profile/:id').get(get_user_by_id);
router.route('/posts/:userId').get(get_posts_by_user);
router.route('/friend/:friendId/:userId').post(protect, add_friend);

export default router;
