import { Role } from "./Role";
import { Program } from "./Program";

export class User {
  id: number;
  name: string;
  role: Role;
  private bookmarks: Program[] = [];

  constructor(id: number, name: string, role: Role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  getBookmarks(): Program[] {
    return this.bookmarks;
  }

  addBookmark(program: Program): void {
    this.bookmarks.push(program);
  }
}
