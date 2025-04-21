import { createBookmark } from "./CreateBookmark";
import { Role } from "../UsersRoles/Role";
import { User } from "../UsersRoles/User";
import { Program } from "models/Program";

describe("createBookmark", () => {
    let user: User;
    
    beforeEach(() => {
        user = {
            id: 1,
            name: "John Doe",
            role: Role.YOUTH,
            bookmarks: [],
            savedPrograms: [],
    
            getId() {
                return this.id;
            },
            setId(value: number) {
                this.id = value;
            },
            getName() {
                return this.name;
            },
            setName(value: string) {
                this.name = value;
            },
            getRole() {
                return this.role;
            },
            setRole(value: Role) {
                this.role = value;
            },
            getBookmarks() {
                return this.bookmarks;
            },
            addBookmark(program: Program) {
                this.bookmarks.push(program);
            },
            removeBookmark(program: Program) {
                this.bookmarks = this.bookmarks.filter(
                    (p) => p.id !== program.id
                );
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
