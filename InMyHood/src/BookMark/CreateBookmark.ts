import { YouthBookmark } from './YouthBookmark';
import { Program } from '../models/Program';
import { Role } from '../UsersRoles/Role';
import { User } from '../UsersRoles/User';

export function createBookmark(user: User, program: Program): YouthBookmark {
  if (user.role !== Role.YOUTH) {
    throw new Error("Only youth users can bookmark programs.");
  }

  if (program.isExpired) {
    throw new Error("Cannot bookmark an expired program.");
  }

  if (program.isFull) {
    throw new Error("Cannot bookmark a full program.");
  }

  const bookmark: YouthBookmark = {
    ...program,
    userId: String(user.id),         
    programId: String(program.id),   
    bookmarkedAt: new Date(),        
  };

  console.log("Bookmark created:", bookmark);
  return bookmark;
}
