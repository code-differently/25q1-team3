import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

// Create a mock auth object for development
const mockAdminAuth = {
  verifyIdToken: async (token: string) => {
    return {
      uid: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User'
    };
  }
};

// Export the mock auth object since we don't have Firebase credentials
export const adminAuth = mockAdminAuth; 