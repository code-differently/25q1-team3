import { Role } from "./Role";
import { User } from "./User";

// This function creates a bookmark for a user.
export function createBookmark(user: User, data: any) {
  if (user.role === Role.LIAISON) {
    throw new Error("Unauthorized: Liaisons can’t create bookmarks!");
  }

  // Otherwise go ahead!
  console.log("Bookmark created:", data);
  return data;
}

// This function will save the bookmark to the database.
function saveBookmarkToDatabase(data: any) {  
  console.log("Bookmark saved to database:", data);
}
