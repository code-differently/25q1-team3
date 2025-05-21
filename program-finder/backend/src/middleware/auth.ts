import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebase';

// Use a simplified auth middleware for development
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Always attach a test user for development
  req.user = {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User'
  };
  next();
};

// This middleware is maintained for backward compatibility
export const testAuthMiddleware = authMiddleware; 