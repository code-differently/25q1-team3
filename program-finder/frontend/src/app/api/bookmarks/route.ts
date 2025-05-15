import { NextResponse } from 'next/server';
import { API_BASE_URL } from '../config';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookmarks`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in bookmarks API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
} 