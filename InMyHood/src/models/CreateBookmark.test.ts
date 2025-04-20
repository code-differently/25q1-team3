import { createBookmark } from "./CreateBookmark";
import { Role } from "./Role";
import { User } from "./User";

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
