import { User } from "../UsersRoles/User";
import { Program } from "../models/Program";

export class BookmarkService {
  static getBookmarks(user: User): Program[] {
    return user.savedPrograms;
  }

  static addBookmark(user: User, program: Program): void {
    const existingBookmark = user.savedPrograms.find(p => String(p.id) === String(program.id));
    if (!existingBookmark) {
      user.savedPrograms.push(program);
    }
  }

  static removeBookmark(user: User, programId: string): void {
    user.savedPrograms = user.savedPrograms.filter(p => String(p.id) !== programId);
  }
}
