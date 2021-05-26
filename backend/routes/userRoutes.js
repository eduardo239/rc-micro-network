import express from 'express';
const router = express.Router();
import {
  auth_user,
  get_user_profile,
  post_new_user,
  update_user_profile,
  getUserById,
  get_all_users,
  postsById_user,
  addFriend,
  delete_friend,
  userDelete,
  admin_control,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(post_new_user).get(protect, get_all_users);
router.route('/login').post(auth_user);
router
  .route('/profile')
  .get(protect, get_user_profile)
  .put(protect, update_user_profile);
router.route('/posts/:userId').get(protect, postsById_user);
router.route('/:id').get(protect, getUserById).delete(protect, userDelete);

export default router;
