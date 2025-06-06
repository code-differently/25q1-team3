import { Response } from 'express';
import { getDb } from '../db';
import { AuthRequest } from '../types';

// Get all bookmarked programs for the current user
export const getBookmarks = async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const bookmarks = await db.all(`
      SELECT DISTINCT p.*
      FROM programs p
      JOIN bookmarks b ON p.id = b.program_id
      WHERE b.user_id = ?
    `, [userId]);

    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

// Add a bookmark
export const addBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const { programId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if program exists
    const program = await db.get('SELECT id FROM programs WHERE id = ?', [programId]);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // Check if bookmark already exists
    const existingBookmark = await db.get(
      'SELECT * FROM bookmarks WHERE user_id = ? AND program_id = ?',
      [userId, programId]
    );

    if (existingBookmark) {
      return res.status(400).json({ error: 'Program already bookmarked' });
    }

    // Add bookmark
    await db.run(
      'INSERT INTO bookmarks (user_id, program_id) VALUES (?, ?)',
      [userId, programId]
    );

    res.status(201).json({ message: 'Bookmark added successfully' });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
};

// Remove a bookmark
export const removeBookmark = async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const { programId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const result = await db.run(
      'DELETE FROM bookmarks WHERE user_id = ? AND program_id = ?',
      [userId, programId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
}; 