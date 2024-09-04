/*
  Warnings:

  - You are about to drop the `account_payable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `account_receivable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "account_payable";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "account_receivable";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "finance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dueDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "finance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
