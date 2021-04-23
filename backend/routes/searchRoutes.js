import express from 'express';
import { search_term } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:term').get(search_term);

export default router;
