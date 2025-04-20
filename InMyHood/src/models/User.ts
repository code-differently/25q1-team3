import { Role } from "./Role";
import { Program } from "./Program";

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

}
