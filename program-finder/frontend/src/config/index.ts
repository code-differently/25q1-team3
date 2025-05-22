// This is a workaround for when environment variables don't work properly
// In production, this should be replaced with proper environment variable handling

interface Config {
  googleMapsApiKey: string;
  // Add other configuration values as needed
  apiBaseUrl: string;
}

const devConfig: Config = {
  googleMapsApiKey: 'AIzaSyBfMtxd8CK-Zi_noMDZ3nFaxf6BTVo_hWc',
  apiBaseUrl: 'http://localhost:3001/api',
};

const prodConfig: Config = {
  // These will be replaced in production by environment variables
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBfMtxd8CK-Zi_noMDZ3nFaxf6BTVo_hWc',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
};

// Use production config when NODE_ENV is 'production', otherwise use development config
const config: Config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config; 