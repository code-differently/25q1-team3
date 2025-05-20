interface GoogleMapProps {
  address: string;
  width?: string;
  height?: string;
}

export function GoogleMap({ address, width = '100%', height = '300px' }: GoogleMapProps) {
  const encodedAddress = encodeURIComponent(address);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;

  return (
    <iframe
      width={width}
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={mapUrl}
    />
  );
}
