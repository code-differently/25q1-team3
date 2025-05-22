import { useEffect, useState } from 'react';
import config from '../config';

interface GoogleMapProps {
  address: string;
  width?: string;
  height?: string;
}

// Access API key from our config file instead of directly from environment variables
const getApiKey = () => {
  // Try the environment variables first (for Next.js)
  const fromNextPublic = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const fromAltName = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  
  // Log detailed information for debugging
  console.log('API Key sources:');
  console.log('- From config:', typeof config.googleMapsApiKey, config.googleMapsApiKey ? '(exists)' : '(undefined)');
  console.log('- From env var 1:', typeof fromNextPublic, fromNextPublic ? '(exists)' : '(undefined)');
  console.log('- From env var 2:', typeof fromAltName, fromAltName ? '(exists)' : '(undefined)');
  
  // Use the config file value as our primary source, fall back to env vars if needed
  return config.googleMapsApiKey || fromNextPublic || fromAltName;
};

export function GoogleMap({ address, width = '100%', height = '300px' }: GoogleMapProps) {
  const [mapUrl, setMapUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const encodedAddress = encodeURIComponent(address);
    const apiKey = getApiKey();
    
    // Only show first few characters for security
    if (apiKey) {
      console.log("Using Google Maps API Key:", apiKey.substring(0, 8) + '...');
    } else {
      console.error("Google Maps API key is missing");
    }
    
    if (!apiKey) {
      setError("Map couldn't be loaded - API key is missing");
      return;
    }

    const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;
    setMapUrl(url);
  }, [address]);

  if (error) {
    return (
      <div 
        style={{ 
          width, 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          color: '#dc3545'
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <>
      {mapUrl && (
        <iframe
          width={width}
          height={height}
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
        />
      )}
    </>
  );
}
