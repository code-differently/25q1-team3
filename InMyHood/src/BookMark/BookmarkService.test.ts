import { BookmarkService } from "./BookmarkService";
import { User } from "../UsersRoles/User";
import { Role } from "../UsersRoles/Role";
import { Program } from "../models/Program";

describe("BookmarkService", () => {
  let user: User;
  let program: Program;

  beforeEach(() => {
    user = new User(2, "Test User", Role.YOUTH);
    program1 = {
      id: 1,
      title: "Basketball Camp",
      description: "Learn how to play basketball!",
      category: "Sports",
      startDate: new Date(),
      endDate: new Date(),
      location: "Philly",
      organizer: "Coach K",
      contact: "coachk@email.com",
    };
    program2 = {
      id: 2,
      title: "Coding Bootcamp",
      description: "Learn how to code!",
      category: "Technology",
      startDate: new Date(),
      endDate: new Date(),
      location: "Online",
      organizer: "Tech Co.",
      contact: "techco@email.com",
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
});

  it("should do nothing if trying to remove a non-existent bookmark", () => {
    BookmarkService.removeBookmark(user, "9999");

    expect(user.savedPrograms).toHaveLength(0);
  });
});
