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

/**
 * Posible status for an offer
 */
export enum OfferStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
}

/**
 * Posible status for a loan
 */
export enum LoanStatus {
  ACTIVE = "Active",
  PAID = "Paid",
  DEFAULTED = "Defaulted",
  PENDING = "Pending",
}

/**
 * Posible status for an installment
 */
export enum InstallmentStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  PARTIAL = "Partial",
}
