import { describe, it, beforeEach } from '@jest/globals';
import { expect } from '@jest/globals';
import { bookmarkProgram } from './YouthBookmark';
import { User, Role } from './YouthBookmark';
import { Program } from '../models/Program';

describe('bookmarkProgram', () => {
  let user: User;
  let program: Program;
  
  beforeEach(() => {
    user = new User('user-123', 'Test User');
    user.role = Role.YOUTH;
    
      program = {
      id: 456,
      name: 'Test Program',
      title: 'Test Title',
      description: 'This is a test program',
      startDate: new Date(),
      endDate: new Date(),
      location: 'Test Location',
      isExpired: false,
      isFull: false,
      category: 'Education',
      organizer: 'Test Organizer',
      contact: 'test@example.com',
    };
  });
  
  it('should allow youth users to bookmark programs', () => {
    // Act
    bookmarkProgram({ user, program });
    
    // Assert
    expect(user.isProgramBookmarked(String(program.id))).toBe(true);
  });
  
  it('should throw an error if user is not youth', () => {
    // Arrange
    user.role = Role.PARENT;
    
    // Act & Assert
    expect(() => bookmarkProgram({ user, program })).toThrow('Only youth users can bookmark programs');
  });
  
  it('should throw an error if program is expired', () => {
    // Arrange
    program.isExpired = true;
    
    // Act & Assert
    expect(() => bookmarkProgram({ user, program })).toThrow('Cannot bookmark an expired program');
  });
  
  // More test cases for other behaviors...
});