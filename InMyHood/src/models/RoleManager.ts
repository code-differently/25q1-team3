// RoleManager.ts
import { Role } from "./Role";
import { User } from "./User";

export class RoleManager {
  // Use a Set for fast lookup
  private static roles: Set<Role> = new Set([Role.YOUTH, Role.PARENT, Role.LIAISON]);

  // Method to assign a role to a user
  static assignRole(user: User, role: Role): void {
    if (!RoleManager.roles.has(role)) {
      throw new Error("Invalid role!"); // Throw error if the role is invalid
    }
    user.role = role; // Assign role to the user
  }

  // Method to list available roles
  static listRoles(): Role[] {
    return Array.from(RoleManager.roles); // Convert Set to array for listing
  }

  // Method to validate if a role is valid
  static validateRole(role: Role): boolean {
    return RoleManager.roles.has(role); // Check if role exists in Set
  }
}
