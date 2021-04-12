import express from 'express';
import {
  newPost,
  getById,
  deleteCommentById,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/:id')
  .post(protect, newPost)
  .get(protect, getById)
  .delete(protect, deleteCommentById);

export default router;
