import { Program } from "./Program";

export enum Role {
    YOUTH = "YOUTH",
    PARENT = "PARENT",
    LIAISON = "LIAISON"
  }
   //defining the youthnookmark interface AI helped with//
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
    [x: string]: Role;
    isProgramBookmarked(arg0: string): any {
        throw new Error("Method not implemented.");
    }
    id: string;
    name: string;
    savedPrograms: Program[];
  
    constructor(id: string, name: string) {
      this.id = id;
      this.name = name;
      this.savedPrograms = []; //When saving a program, it will create an empty array//
    }
  
    // A method to save a program; this method also prevents saving it twice (which AI helped me with this as well)//

    saveProgram(program: Program) {
    const alreadySaved = this.savedPrograms.some(p => p.id === program.id);
    if (!alreadySaved) {
    this.savedPrograms.push(program);
  }
   }

}  


  