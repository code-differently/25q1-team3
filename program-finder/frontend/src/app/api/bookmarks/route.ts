import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../db';

// GET /api/bookmarks
export async function GET() {
  try {
    const db = await getDb();
    // For demo: userId is hardcoded. Replace with real auth if needed.
    const userId = 1;
    const bookmarks = await db.all(`
      SELECT p.*, b.id as bookmark_id
      FROM programs p
      JOIN bookmarks b ON p.id = b.program_id
      WHERE b.user_id = ?
    `, [userId]);
    return NextResponse.json(bookmarks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

// POST /api/bookmarks
export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const { programId } = await request.json();
    const userId = 1; // Hardcoded for demo

    // Check if program exists
    const program = await db.get('SELECT id FROM programs WHERE id = ?', [programId]);
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Check if bookmark already exists
    const existingBookmark = await db.get(
      'SELECT id FROM bookmarks WHERE user_id = ? AND program_id = ?',
      [userId, programId]
    );
    if (existingBookmark) {
      return NextResponse.json({ error: 'Program already bookmarked' }, { status: 400 });
    }

    // Add bookmark
    await db.run(
      'INSERT INTO bookmarks (user_id, program_id) VALUES (?, ?)',
      [userId, programId]
    );
    return NextResponse.json({ message: 'Bookmark added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }
}

// DELETE /api/bookmarks
export async function DELETE(request: NextRequest) {
  try {
    const db = await getDb();
    const { programId } = await request.json();
    const userId = 1; // Hardcoded for demo

    const result = await db.run(
      'DELETE FROM bookmarks WHERE user_id = ? AND program_id = ?',
      [userId, programId]
    );
    if (result.changes === 0) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
  }
} 