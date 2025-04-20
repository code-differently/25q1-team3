import { createBookmark } from "./CreateBookmark";
import { Role } from "../UsersRoles/Role";
import { User } from "../UsersRoles/User";

describe("createBookmark", () => {
    let user: User;
    
    beforeEach(() => {
        user = {
        id: 1,
        name: "John Doe",
        role: Role.YOUTH,
        bookmarks: [],
        savedPrograms: [],
        getBookmarks: function () {
            return this.bookmarks;
        },
        addBookmark: function (bookmark) {
            this.bookmarks.push(bookmark);
        }
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
