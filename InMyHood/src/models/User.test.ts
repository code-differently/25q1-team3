// User.test.ts
import { User } from "../models/User";
import { Role } from "../models/Role";

describe("User", () => {
  it("should initialize with a username and role", () => {
    const user = new User(1, "khayla", Role.YOUTH);
    expect(user.name).toBe("khayla");
    expect(user.role).toBe(Role.YOUTH);
  });

  it("should return an empty bookmarks array initially", () => {
    const user = new User(1, "khayla", Role.YOUTH);
    expect(user.getBookmarks()).toEqual([]);
  });

});
