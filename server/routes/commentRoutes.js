import express from 'express';
import { addComment } from '../controllers/commentcontroller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/:postId', protect, addComment);

export default router;
