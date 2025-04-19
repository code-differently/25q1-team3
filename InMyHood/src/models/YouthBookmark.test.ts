import { Role, User } from "./YouthBookmark";

export function bookmarkProgram({ user, program }: { user: User; program: Program; }): void {
    
    if (user.role === Role.YOUTH) {
        console.log("This user is a youth.");
      } else {
        console.log("This user is not a youth.");
      }
    
    if (user.role !== Role.YOUTH) {
      throw new Error("Only youth users can bookmark programs."); // Chat & co-pilot assisted with these codes to elimate the errors.//
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

      const user = new User("user-001", "Alex");
      user.isProgramBookmarked("program-123");

console.log(user.isProgramBookmarked("program-123")); // true
console.log(user.isProgramBookmarked("program-999")); // false

      return;
    }
}