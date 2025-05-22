import { NextResponse } from 'next/server';

export async function GET() {
  // Get environment variables
  const envVars = {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '(not set)',
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '(not set)',
    NODE_ENV: process.env.NODE_ENV || '(not set)',
  };

  // For security, we'll mask the actual keys
  if (envVars.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== '(not set)') {
    const key = envVars.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    envVars.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = key.substring(0, 8) + '...' + key.substring(key.length - 4);
  }

  if (envVars.NEXT_PUBLIC_GOOGLE_API_KEY !== '(not set)') {
    const key = envVars.NEXT_PUBLIC_GOOGLE_API_KEY;
    envVars.NEXT_PUBLIC_GOOGLE_API_KEY = key.substring(0, 8) + '...' + key.substring(key.length - 4);
  }

  return NextResponse.json({
    message: 'Environment Variable Debug Info',
    envVars,
    hasGoogleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY !== undefined,
    hasGoogleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY !== undefined,
  });
} 