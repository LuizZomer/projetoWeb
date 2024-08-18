/*
  Warnings:

  - You are about to alter the column `status` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idnr" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "loyalty_points" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    "contactId" TEXT,
    CONSTRAINT "customers_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("contactId", "createdAt", "fullName", "id", "idnr", "loyalty_points", "password", "status", "updateAt") SELECT "contactId", "createdAt", "fullName", "id", "idnr", "loyalty_points", "password", "status", "updateAt" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
