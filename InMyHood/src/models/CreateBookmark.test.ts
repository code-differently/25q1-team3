import { createBookmark } from "./CreateBookmark";
import { Role } from "./Role";
import { User } from "./User";

// Example usage
const kid = new User("Timmy", Role.YOUTH);
const parent = new User("Mom", Role.PARENT);
const liaison = new User("Helper", Role.LIAISON);

createBookmark(kid, { title: "Cool Program" }); // ✅ works!
createBookmark(parent, { title: "Another One" }); // ✅ works!
createBookmark(liaison, { title: "Oops" }); // ❌ will throw an error!

// Tests
describe("createBookmark", () => {
    let user: User;

    beforeEach(() => {
        user = {
            id: 1,
            name: "John Doe",
            role: Role.YOUTH
        };
    });

    it("should create a bookmark for a user", () => {
        const data = { url: "https://example.com" };
        const result = createBookmark(user, data);
        expect(result).toEqual(data);
    });

    it("should throw an error if the user is a liaison", () => {
        user.role = Role.LIAISON;
        const data = { url: "https://example.com" };
        expect(() => createBookmark(user, data)).toThrow(
            "Unauthorized: Liaisons can’t create bookmarks!"
        );
    });
});
