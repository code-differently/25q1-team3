import { BookmarkService } from "./BookmarkService";
import { User } from "../models/User";
import { Role } from "../UsersRoles/Role";
import { Program } from "../models/Program";

describe("BookmarkService", () => {
  let user: User;
  let program: Program;

  beforeEach(() => {
    user = new User(1, "Ezra", Role.YOUTH);

    program = {
      id: 1001,
      name: "Coding Bootcamp",
      title: "Full Stack Bootcamp",
      description: "Learn full stack development",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-06-30"),
      location: "Newark, DE",
      category: "Tech",
      organizer: "Code Differently",
      contact: "cd@codediff.com",
      isExpired: false,
      isFull: false,
    };
  });

  it("should add a bookmark correctly", () => {
    BookmarkService.addBookmark(user, program);

    expect(user.savedPrograms.length).toBe(1);
    expect(user.savedPrograms[0].id).toBe(program.id);
  });

  it("should not add a duplicate bookmark", () => {
    BookmarkService.addBookmark(user, program);
    BookmarkService.addBookmark(user, program);

    expect(user.savedPrograms.length).toBe(1);
  });

  it("should return all bookmarks", () => {
    BookmarkService.addBookmark(user, program);

    const bookmarks = BookmarkService.getBookmarks(user);
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].title).toBe("Full Stack Bootcamp");
  });

  it("should remove a bookmark correctly", () => {
    BookmarkService.addBookmark(user, program);
    BookmarkService.removeBookmark(user, String(program.id));

    expect(user.savedPrograms).toHaveLength(0);
  });

  it("should do nothing if trying to remove a non-existent bookmark", () => {
    BookmarkService.removeBookmark(user, "9999");

    expect(user.savedPrograms).toHaveLength(0);
  });
});
