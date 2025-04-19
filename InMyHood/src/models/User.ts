import { Role } from "./Role";

export class User {
  username: string;
  role: Role;

  constructor(username: string, role: Role) {
    this.username = username;
    this.role = role;
  }
}
