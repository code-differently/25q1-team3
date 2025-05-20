import express from 'express';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmarkController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// All bookmark routes require authentication
router.use(authMiddleware);

router.get('/', getBookmarks);

router.post('/:programId', addBookmark);

router.delete('/:programId', removeBookmark);

export default router; 