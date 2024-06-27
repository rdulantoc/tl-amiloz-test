/**
 * Defined as TypeScript enums instead of Prisma enums
 * because SQLite doesn't support it.
 * Should be in sync with the database.
 */

/**
 * Possible roles for an user.
 */
export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}
