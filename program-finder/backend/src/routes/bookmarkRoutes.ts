import express from 'express';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmarkController';
import { authMiddleware, testAuthMiddleware } from '../middleware/auth';
import { getDb } from '../db';

const router = express.Router();

// Use the test auth middleware for development
// In production, this should be replaced with authMiddleware
const useTestAuth = process.env.NODE_ENV !== 'production';
router.use(useTestAuth ? testAuthMiddleware : authMiddleware);

// Define a route to check if a program is bookmarked
router.get('/check/:programId', async (req, res, next) => {
  try {
    const { programId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get the database connection correctly
    const db = await getDb();
    const existingBookmark = await db.get(
      'SELECT * FROM bookmarks WHERE user_id = ? AND program_id = ?',
      [userId, programId]
    );
    
    res.json({ isBookmarked: !!existingBookmark });
  } catch (error) {
    console.error('Error checking bookmark status:', error);
    next(error);
  }
});

router.get('/', getBookmarks);

router.post('/:programId', addBookmark);

router.delete('/:programId', removeBookmark);

export default router; 