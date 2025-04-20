// User.test.ts
import { User } from "../models/User";
import { Role } from "../models/Role";

describe("User", () => {
  it("should initialize with a username and role", () => {
    const user = new User("khayla", Role.YOUTH);
    expect(user.username).toBe("khayla");
    expect(user.role).toBe(Role.YOUTH);
  });

  it("should return an empty bookmarks array initially", () => {
    const user = new User("khayla", Role.YOUTH);
    expect(user.getBookmarks()).toEqual([]);
  });

});
