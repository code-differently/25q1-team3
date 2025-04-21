import { Program } from "../models/Program";

export enum Role {
  YOUTH = "YOUTH",
  PARENT = "PARENT",
  LIAISON = "LIAISON"
  }


export interface YouthBookmark extends Program {
  bookmarkedAt: Date;
  id: number;
  name: string;
  programId: string;
  title: string;
  userId: string;
  category: string;
  isExpired: boolean;
  isFull: boolean;
}

export class User { 
  id: string;
  name: string;
  savedPrograms: Program[];
  role?: Role; // Use optional property instead of index signature

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.savedPrograms = [];
  }

  // Check if a program is already bookmarked
  isProgramBookmarked(programId: string): boolean {
    return this.savedPrograms.some(p => String(p.id) === programId);
  }

  // Save a program if not already saved
  saveProgram(program: Program): void {
    if (!this.isProgramBookmarked(String(program.id))) {
      this.savedPrograms.push(program);
    
    }
  }
}
export function bookmarkProgram({ user, program }: { user: User; program: Program }): void {
    // Log user role status
    if (user.role === Role.YOUTH) {
      console.log("This user is a youth.");
    } else {
      console.log("This user is not a youth.");
      throw new Error("Only youth users can bookmark programs.");
    }
    
    // Validate program status
    if (program.isExpired) {
      throw new Error("Cannot bookmark an expired program.");
    }
    
    if (program.isFull) {
      throw new Error("Cannot bookmark a full program.");
    }
    
    // If we reach here, bookmark the program
    user.saveProgram(program);
}