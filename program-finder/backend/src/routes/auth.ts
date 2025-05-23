import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Initialize Google OAuth client
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'
);

// Google OAuth login endpoint
router.get('/google', (req, res) => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  });
  res.redirect(authUrl);
});

// Google OAuth callback endpoint
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const { tokens } = await client.getToken(code as string);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('No payload from Google');
    }

    // Create or update user in your database here
    // For now, we'll just create a JWT token
    const token = jwt.sign(
      { 
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/login?token=${token}`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`);
  }
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ authenticated: true, user: decoded });
  } catch (error) {
    res.json({ authenticated: false });
  }
});

// Get user info endpoint
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router; 