const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy middleware configuration
app.use('/api', createProxyMiddleware({
  target: process.env.BACKEND_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to backend
  },
}));

// Export the Express API
module.exports = app; 