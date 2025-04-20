// User.test.ts
import { User } from "./User";
import { Role } from "./Role";
import { Program } from "../models/Program";

describe("User YOUTH", () => {
  it("should initialize with a username and role", () => {
    const user = new User(1, "khayla", Role.YOUTH);
    expect(user.name).toBe("khayla");
    expect(user.role).toBe(Role.YOUTH);
  });

  it("should return an empty bookmarks array initially", () => {
    const user = new User(1, "khayla", Role.YOUTH);
    expect(user.bookmarks).toEqual([]);
  });

  const program1: Program = {
    id: 1,
    name: "Program One",
    title: "Intro to TS",
    isExpired: false,
  };
  
  const program2: Program = {
    id: 2,
    name: "Program Two",
    title: "Advanced TS",
    isExpired: true,
  };
  
  describe("User Class Tests", () => {
    it("should allow getting and setting id, name, and role", () => {
      const user = new User(101, "Alice", Role.LIAISON);
  
      expect(user.id).toBe(101);
      expect(user.name).toBe("Alice");
      expect(user.role).toBe(Role.LIAISON);
  
      // Update values
      user.id = 202;
      user.name = "Bob";
      user.role = Role.PARENT;
  
      expect(user.id).toBe(202);
      expect(user.name).toBe("Bob");
      expect(user.role).toBe(Role.PARENT);
    });
  
    it("should add and remove bookmarks correctly", () => {
      const user = new User(1, "TestUser", Role.YOUTH);
  
      expect(user.bookmarks).toEqual([]);
  
      user.addBookmark(program1);
      user.addBookmark(program2);
  
      expect(user.bookmarks).toEqual([program1, program2]);
  
      user.removeBookmark(program1);
  
      expect(user.bookmarks).toEqual([program2]);
  });
});
});
