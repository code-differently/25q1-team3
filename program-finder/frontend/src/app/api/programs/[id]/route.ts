import { NextResponse } from 'next/server';
import { API_BASE_URL } from '../../config';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/programs/${params.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch program details');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in program detail API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch program details' },
      { status: 500 }
    );
  }
} 