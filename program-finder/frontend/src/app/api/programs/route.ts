import { NextResponse } from 'next/server';
import { API_BASE_URL } from '../config';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  console.log('API Route: Received request for programs');
  try {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip');
    const keyword = searchParams.get('keyword');
    const ageGroup = searchParams.get('ageGroup');
    const category = searchParams.get('category');
    const distance = searchParams.get('distance');

    console.log('Query parameters:', { zip, keyword, ageGroup, category, distance });

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (zip) queryParams.append('zip', zip);
    if (keyword) queryParams.append('keyword', keyword);
    if (ageGroup) queryParams.append('ageGroup', ageGroup);
    if (category) queryParams.append('category', category);
    if (distance) queryParams.append('distance', distance);

    const backendUrl = `${API_BASE_URL}/api/programs${queryParams.toString() ? `?${queryParams}` : ''}`;
    console.log('Forwarding request to:', backendUrl);

    // Forward the request to your Express backend
    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Backend response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to fetch programs');
    }

    const data = await response.json();
    console.log('Backend response data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in programs API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
} 