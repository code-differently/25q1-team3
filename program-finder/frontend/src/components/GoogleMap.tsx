'use client';

import React from 'react';

interface GoogleMapProps {
  address: string;
  width?: string;
  height?: string;
}

export function GoogleMap({ address, width = '100%', height = '300px' }: GoogleMapProps) {
  const encodedAddress = encodeURIComponent(address);
  const apiKey = 'AIzaSyAcodHwg5m7AUlBiC5Spe5CcxSRjpGSZRo';
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;

  return (
    <div style={{ width, height, margin: '1rem 0' }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '8px' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
      />
    </div>
  );
} 