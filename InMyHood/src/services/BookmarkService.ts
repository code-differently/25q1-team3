import { User } from "../models/User";
import { Program } from "../models/Program";
import { BookmarkAlreadyExistsException, ProgramNotFoundException } from "../utils/CustomExceptions";

export class BookmarkService {
  static addBookmark(user: User, program: Program): void {
    const alreadyBookmarked = user.getBookmarks().some(p => p.id === program.id);
    if (alreadyBookmarked) {
      throw new BookmarkAlreadyExistsException(`Program '${program.title}' is already bookmarked.`);
    }
    user.getBookmarks().push(program);
  }

  static removeBookmark(user: User, programId: number): void {
    const bookmarks = user.getBookmarks();
    const index = bookmarks.findIndex(p => p.id === programId);
    if (index === -1) {
      throw new ProgramNotFoundException(`Program with ID '${programId}' not found in bookmarks.`);
    }
    bookmarks.splice(index, 1);
  }
}
