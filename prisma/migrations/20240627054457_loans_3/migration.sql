-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "loanedAmount" REAL NOT NULL,
    "dueAmount" REAL NOT NULL,
    "term" INTEGER NOT NULL,
    "interestRate" REAL NOT NULL,
    "loanStatusId" INTEGER DEFAULT 4,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_loanStatusId_fkey" FOREIGN KEY ("loanStatusId") REFERENCES "LoanStatus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("createdAt", "dueAmount", "id", "interestRate", "loanStatusId", "loanedAmount", "offerId", "term", "updatedAt", "userId") SELECT "createdAt", "dueAmount", "id", "interestRate", "loanStatusId", "loanedAmount", "offerId", "term", "updatedAt", "userId" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE UNIQUE INDEX "Loan_offerId_key" ON "Loan"("offerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
