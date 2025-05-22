/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  
  // Environment variables should be configured via .env files, not here
  // for security reasons. This comment serves as a reminder.
  
  // Add environment variables with fallback to hardcoded key for development
  env: {
    NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 
                               process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 
                               'AIzaSyBfMtxd8CK-Zi_noMDZ3nFaxf6BTVo_hWc',
    
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 
                                    process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
                                    'AIzaSyBfMtxd8CK-Zi_noMDZ3nFaxf6BTVo_hWc',
  },
  
  // Configure static file serving
  images: {
    domains: ['localhost'],
  },

  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ]
  },

  // Webpack configuration for jQuery
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig 