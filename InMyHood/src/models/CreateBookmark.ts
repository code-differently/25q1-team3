import { Role } from "../UsersRoles/Role";
import { User } from "../UsersRoles/User";

// This function creates a bookmark for a user.
export function createBookmark(user: User, data: any) {
  if (user.role === Role.LIAISON) {
    throw new Error("Unauthorized: Liaisons can’t create bookmarks!");
  }

  // Otherwise go ahead!
  console.log("Bookmark created:", data);
  return data;
}

// This funtion will save the bookmark to the database.
function saveBookmarkToDatabase(data: any) {  
  console.log("Bookmark saved to database:", data);
}