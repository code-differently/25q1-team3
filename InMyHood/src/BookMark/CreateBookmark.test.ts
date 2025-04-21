import { createBookmark } from './CreateBookmark';
import { Role } from '../UsersRoles/Role';
import { User } from '../UsersRoles/User';
import { Program } from '../models/Program';

describe("createBookmark", () => {
  let user: User;
  let program: Program;

  beforeEach(() => {
    user = new User(1, "Ezra", Role.YOUTH);
    program = {
      id: 1234,
      name: "Dance Class",
      title: "Dance Class",
      description: "Learn to dance",
      category: "Dance",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-20"),
      location: "Wilmington, DE",
      organizer: "Ezra Org",
      contact: "ezra@example.com",
      isFull: false,
      isExpired: false
    };
  });

  it("should create a bookmark for a youth user", () => {
    const bookmark = createBookmark(user, program);
    expect(bookmark.userId).toBe("1");
    expect(bookmark.programId).toBe("1234");
    expect(bookmark.bookmarkedAt).toBeInstanceOf(Date);
  });

  it("should throw an error for expired programs", () => {
    program.isExpired = true;
    expect(() => createBookmark(user, program)).toThrow("Cannot bookmark an expired program.");
  });
});
