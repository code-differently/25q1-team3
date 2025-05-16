import { Request, Response } from 'express';
import { getDb } from '../db';

// Get all bookmarked programs for the current user
export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    // TODO: Replace with actual user ID from authentication
    const userId = 1; // Temporary hardcoded user ID

    const bookmarks = await db.all(`
      SELECT p.*, b.id as bookmark_id
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
export const addBookmark = async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const { programId } = req.params;
    // TODO: Replace with actual user ID from authentication
    const userId = 1; // Temporary hardcoded user ID

    // Check if program exists
    const program = await db.get('SELECT id FROM programs WHERE id = ?', [programId]);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    // Check if bookmark already exists
    const existingBookmark = await db.get(
      'SELECT id FROM bookmarks WHERE user_id = ? AND program_id = ?',
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
export const removeBookmark = async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const { programId } = req.params;
    // TODO: Replace with actual user ID from authentication
    const userId = 1; // Temporary hardcoded user ID

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