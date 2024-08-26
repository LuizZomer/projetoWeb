/*
  Warnings:

  - You are about to drop the column `contactId` on the `customers` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "contacts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contacts" ("createdAt", "id", "type", "updateAt", "value") SELECT "createdAt", "id", "type", "updateAt", "value" FROM "contacts";
DROP TABLE "contacts";
ALTER TABLE "new_contacts" RENAME TO "contacts";
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idnr" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "loyalty_points" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_customers" ("createdAt", "email", "fullName", "id", "idnr", "loyalty_points", "password", "status", "updateAt") SELECT "createdAt", "email", "fullName", "id", "idnr", "loyalty_points", "password", "status", "updateAt" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "function" TEXT,
    "idnr" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "workload" TEXT,
    "lastAccess" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "contactId" TEXT
);
INSERT INTO "new_users" ("contactId", "createdAt", "fullName", "function", "id", "idnr", "lastAccess", "password", "role", "status", "updateAt", "username", "workload") SELECT "contactId", "createdAt", "fullName", "function", "id", "idnr", "lastAccess", "password", "role", "status", "updateAt", "username", "workload" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
