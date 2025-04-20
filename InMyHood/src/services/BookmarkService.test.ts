import { BookmarkService } from "./BookmarkService";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { Program } from "../models/Program";
import {
  BookmarkAlreadyExistsException,
  ProgramNotFoundException,
} from "../utils/CustomExceptions";

describe("BookmarkService", () => {
  let user: User;
  let program1: Program;
  let program2: Program;

  // Set up the user and programs before each test
  beforeEach(() => {
    user = new User("Test User", Role.YOUTH);
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

  test("should add a bookmark correctly", () => {
    BookmarkService.addBookmark(user, program1);
    expect(BookmarkService.getBookmarks(user)).toContainEqual(program1);
  });

  test("should throw error if trying to add the same program twice", () => {
    BookmarkService.addBookmark(user, program1);
    expect(() => {
      BookmarkService.addBookmark(user, program1);
    }).toThrow(BookmarkAlreadyExistsException);
  });

  test("should remove a bookmark correctly", () => {
    BookmarkService.addBookmark(user, program1);
    BookmarkService.removeBookmark(user, program1.id);
    expect(BookmarkService.getBookmarks(user).length).toBe(0);
  });

  test("should throw error if trying to remove a non-existent program", () => {
    expect(() => {
      BookmarkService.removeBookmark(user, program1.id);
    }).toThrow(ProgramNotFoundException);
  });

  // You can add more tests as needed
});
