import { Program } from "./Program";

export enum Role {
    YOUTH = "YOUTH",
    PARENT = "PARENT",
    LIAISON = "LIAISON"
  }
  
  export interface YouthBookmark extends Program {
    bookmarkedAt: Date;
    id: number;
    name: string;
    isExpired: boolean;
    isFull: boolean;
  }
  
  export class User {
    public savedPrograms: Program[] = [];
    
      public id: number | undefined;
      public name: string | undefined;
      public role: Role | undefined;
  }

// Removed duplicate import of Program as it is already imported at the top of the file.
// Removed incorrect import of Role as it is already defined in this file.

export function bookmarkProgram(user: User, program: Program): void {
  if (user.role !== Role.YOUTH) {
    throw new Error("Only youth users can bookmark programs.");
  }

  if (program.isExpired) {
    throw new Error("Cannot bookmark an expired program.");
  }

  if (program.isFull) {
    throw new Error("Cannot bookmark a full program.");
  }

  const alreadySaved = user.savedPrograms.some(p => p.id === program.id);
  if (alreadySaved) {
    console.log("Program is already bookmarked.");
    return;
  }

  user.savedPrograms.push(program);
  console.log(`Bookmarked program: ${program.name}`);
}

  