import { Role } from "./Role";
import { Program } from "../models/Program";

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

  //Getters and Setters
  getId(): number{
    return this.id
  }

  setId(value: number) {
    this.id = value;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getRole(): Role {
    return this.role;
  }

  setRole(value: Role) {
    this.role = value;
  }

  getBookmarks(): Program[] {
    return this.bookmarks;
  }

  addBookmark(program: Program): void {
    this.bookmarks.push(program);
  }
  
  removeBookmark(program: Program): void {
    this.bookmarks = this.bookmarks.filter(p => p !== program);
  }
}
