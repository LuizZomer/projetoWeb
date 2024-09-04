/*
  Warnings:

  - You are about to drop the column `descrition` on the `account_payable` table. All the data in the column will be lost.
  - You are about to drop the column `descrition` on the `account_receivable` table. All the data in the column will be lost.
  - Added the required column `description` to the `account_payable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `account_receivable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_account_payable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dueDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "account_payable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_account_payable" ("createdAt", "dueDate", "id", "status", "userId", "value") SELECT "createdAt", "dueDate", "id", "status", "userId", "value" FROM "account_payable";
DROP TABLE "account_payable";
ALTER TABLE "new_account_payable" RENAME TO "account_payable";
CREATE TABLE "new_account_receivable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dueDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "account_receivable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_account_receivable" ("createdAt", "dueDate", "id", "status", "userId", "value") SELECT "createdAt", "dueDate", "id", "status", "userId", "value" FROM "account_receivable";
DROP TABLE "account_receivable";
ALTER TABLE "new_account_receivable" RENAME TO "account_receivable";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
