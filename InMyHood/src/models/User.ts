import { Role } from "../UsersRoles/Role";
import { Program } from "./Program";

export class User {
  
  
    id: number;
    name: string;
    role: Role;
    bookmarks: Program[] = [];
    savedPrograms: Program[];

  constructor(id: number, name: string, role: Role) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.savedPrograms = [];
  }

  getBookmarks(): Program[] {
    return this.bookmarks;
  }

  addBookmark(program: Program): void {
    this.bookmarks.push(program);
  }
}
