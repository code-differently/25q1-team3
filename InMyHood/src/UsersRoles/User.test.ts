import { User } from "../UsersRoles/User";
import { Role } from "./Role";
import { Program } from "../models/Program";

describe("User Class - Getters and Setters", () => {
  let user: User;
  const sampleProgram: Program = {
    id: 1,
    name: "Sample Program",
    title: "Test",
    isExpired: false,
    isFull: false,
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    location: "",
    category: "",
    organizer: "",
    contact: ""
  };

  beforeEach(() => {
    user = new User(101, "InitialName", Role.YOUTH);
  });

  it("should get and set id using methods", () => {
    expect(user.getId()).toBe(101);
    user.setId(202);
    expect(user.getId()).toBe(202);
  });

  it("should get and set name using methods", () => {
    expect(user.getName()).toBe("InitialName");
    user.setName("UpdatedName");
    expect(user.getName()).toBe("UpdatedName");
  });

  it("should get and set role using methods", () => {
    expect(user.getRole()).toBe(Role.YOUTH);
    user.setRole(Role.PARENT);
    expect(user.getRole()).toBe(Role.PARENT);
  });

  it("should return empty bookmarks initially", () => {
    expect(user.getBookmarks()).toEqual([]);
  });

  it("should add bookmarks correctly", () => {
    user.addBookmark(sampleProgram);
    expect(user.getBookmarks()).toHaveLength(1);
    expect(user.getBookmarks()[0]).toEqual(sampleProgram);
  });

  it("should remove a specific bookmark", () => {
    user.addBookmark(sampleProgram);
    expect(user.getBookmarks()).toContain(sampleProgram);

    user.removeBookmark(sampleProgram);
    expect(user.getBookmarks()).not.toContain(sampleProgram);
    expect(user.getBookmarks().length).toBe(0);
  });

  it("should not fail when removing a bookmark that doesn't exist", () => {
    // Just making sure the method doesn't crash
    expect(() => user.removeBookmark(sampleProgram)).not.toThrow();
    expect(user.getBookmarks()).toEqual([]);
  });
});

