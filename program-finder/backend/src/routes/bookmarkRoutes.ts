import express from 'express';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmarkController';

const router = express.Router();

router.get('/', getBookmarks);

router.post('/:programId', addBookmark);

router.delete('/:programId', removeBookmark);

export default router; 