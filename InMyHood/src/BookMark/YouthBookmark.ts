import { Program } from "../models/Program";

export enum Role {
  YOUTH = "YOUTH",
  PARENT = "PARENT",
  LIAISON = "LIAISON"
}

export class YouthBookmark implements Program {
  bookmarkedAt: Date;
  id: number;
  name: string;
  programId: string;
  title: string;
  userId: string;
  category: string;
  isExpired: boolean;
  isFull: boolean;

  constructor(data: {
    bookmarkedAt: Date;
    id: number;
    name: string;
    programId: string;
    title: string;
    userId: string;
    category: string;
    isExpired: boolean;
    isFull: boolean;
  }) {
    this.bookmarkedAt = data.bookmarkedAt;
    this.id = data.id;
    this.name = data.name;
    this.programId = data.programId;
    this.title = data.title;
    this.userId = data.userId;
    this.category = data.category;
    this.isExpired = data.isExpired;
    this.isFull = data.isFull;
  }
  description!: string;
  startDate!: Date;
  endDate!: Date;
  location!: string;
  organizer!: string;
  contact!: string;
}

export class User {
  id: string;
  name: string;
  savedPrograms: Program[];
  role?: Role;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.savedPrograms = [];
  }

  isProgramBookmarked(programId: string): boolean {
    return this.savedPrograms.some(p => String(p.id) === programId);
  }

  saveProgram(program: Program): void {
    if (!this.isProgramBookmarked(String(program.id))) {
      this.savedPrograms.push(program);
    }
  }
}

export function bookmarkProgram({
  user,
  program
}: {
  user: User;
  program: Program;
}): void {
  if (user.role === Role.YOUTH) {
    console.log("This user is a youth.");
  } else {
    console.log("This user is not a youth.");
    throw new Error("Only youth users can bookmark programs.");
  }

  if (program.isExpired) {
    throw new Error("Cannot bookmark an expired program.");
  }

  if (program.isFull) {
    throw new Error("Cannot bookmark a full program.");
  }

  user.saveProgram(program);
}
