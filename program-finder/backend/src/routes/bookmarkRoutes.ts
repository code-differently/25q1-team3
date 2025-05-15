import express from 'express';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmarkController';

const router = express.Router();

// Get all bookmarked programs for the current user
router.get('/', getBookmarks);

// Add a bookmark
router.post('/:programId', addBookmark);

// Remove a bookmark
router.delete('/:programId', removeBookmark);

export default router; 