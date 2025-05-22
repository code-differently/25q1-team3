import { Request } from 'express';
import { User } from '../models/User';
 
// Define a custom request interface with the user property
export interface AuthRequest extends Request {
  user?: User;
} 