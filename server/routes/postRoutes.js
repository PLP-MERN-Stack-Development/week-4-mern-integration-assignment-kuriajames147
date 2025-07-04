import express from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, upload.single('image'), createPost);
router.get('/:id', getPost);
router.put('/:id', protect, upload.single('image'), updatePost);
router.delete('/:id', protect, deletePost);

export default router;
