// Test for RoleManager
import { RoleManager } from "./RoleManager";
import { Role } from "../UsersRoles/Role";

describe("RoleManager", () => {
  let roleManager: RoleManager;

  beforeEach(() => {
    roleManager = new RoleManager();
  });

  test("should add valid roles", () => {
    roleManager.addRole(Role.YOUTH);
    expect(roleManager.hasRole(Role.YOUTH)).toBe(true);
  });

  test("should not add invalid roles", () => {
    const invalidRole = "INVALID_ROLE" as Role;
    roleManager.addRole(invalidRole);
    expect(roleManager.hasRole(invalidRole)).toBe(false);
  });

  test("should return correct list of roles", () => {
    roleManager.addRole(Role.YOUTH);
    roleManager.addRole(Role.PARENT);
    expect(roleManager.getRoles()).toEqual([Role.YOUTH, Role.PARENT]);
  });

  test("should not add the same role twice", () => {
    roleManager.addRole(Role.YOUTH);
    roleManager.addRole(Role.YOUTH);
    expect(roleManager.getRoles()).toEqual([Role.YOUTH]);
  });

  test("should remove role correctly", () => {
    roleManager.addRole(Role.YOUTH);
    roleManager.removeRole(Role.YOUTH);
    expect(roleManager.hasRole(Role.YOUTH)).toBe(false);
  });

  test("should handle removing role that doesn't exist", () => {
    roleManager.removeRole(Role.LIAISON);
    expect(roleManager.hasRole(Role.LIAISON)).toBe(false);
  });
});
