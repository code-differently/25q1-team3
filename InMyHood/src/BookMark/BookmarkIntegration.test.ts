
import {User} from '../UsersRoles/User';
import {Role} from '../UsersRoles/Role';

import {Program} from '../models/Program';
import {ProgramSeed} from '../models/ProgramSeed';
import {BookmarkService} from '../BookMark/BookmarkService';
import {YouthBookmark} from '../BookMark/YouthBookmark';
import {createBookmark} from '../BookMark/CreateBookmark';

describe('Bookmark Integration Tests', () => {
  let user: User;
  let program: Program;
  let bookmarkService: BookmarkService;

  beforeEach(() => {
    user = new User(1, 'John Doe', Role.YOUTH);
    program = ProgramSeed[0]; 
    bookmarkService = new BookmarkService();
  });

  test('should bookmark a program for a youth user', () => {
    user.role = Role.YOUTH;
    const bookmark: YouthBookmark = createBookmark(user, program);

    expect(bookmark).toBeDefined();
    expect(bookmark.userId).toBe(String(user.id));
    expect(bookmark.programId).toBe(String(program.id));
    expect(bookmark.bookmarkedAt).toBeInstanceOf(Date);
  });
  test('should not bookmark a program for a non-youth user', () => {
    user.role = Role.PARENT

    expect(() => createBookmark(user, program)).toThrowError(
      'Only youth users can bookmark programs.'
    );
   
    
  });

  test('should throw an error if the program is expired', () => {
    user.role = Role.YOUTH;
    program.isExpired = true;
  });

  test('should throw an error if the user is not a youth', () => {
    user.role = Role.PARENT;


  });
});