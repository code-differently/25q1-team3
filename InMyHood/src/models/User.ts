import { Role } from "./Role";
import { Program } from "./Program";
import { ProgramNotFoundException, BookmarkAlreadyExistsException } from "../utils/CustomExceptions";


export class User {
  username: string;
  role: Role;
  private bookmarks: Program[] = [];

  constructor(username: string, role: Role) {
    this.username = username;
    this.role = role;
  }
  getBookmarks(): Program[] {
    return this.bookmarks;
  }
  // // Add a bookmark
  // addBookmark(program: Program): void {
  //   const alreadyBookmarked = this.bookmarks.find(p => p.id === program.id);
  //   if (alreadyBookmarked) {
  //     throw new BookmarkAlreadyExistsException(`Program '${program.title}' is already bookmarked.`);
  //   }
  //   this.bookmarks.push(program);
  // }

  // removeBookmark(programId: number): void {
  //   const index = this.bookmarks.findIndex(p => p.id === programId);
  //   if (index === -1) {
  //     throw new ProgramNotFoundException(`Program with ID '${programId}' not found in bookmarks.`);
  //   }
  //   this.bookmarks.splice(index, 1);
  // }

  // // List bookmarks
  // getBookmarks(): Program[] {
  //   return this.bookmarks;
  // }
}
