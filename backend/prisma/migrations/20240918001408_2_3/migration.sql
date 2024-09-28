/*
  Warnings:

  - You are about to drop the column `description` on the `revenues` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_revenues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "orderId" TEXT,
    "customerId" TEXT,
    "customerName" TEXT,
    "userId" TEXT,
    CONSTRAINT "revenues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenues_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_revenues" ("customerId", "customerName", "date", "id", "orderId", "status", "userId", "value") SELECT "customerId", "customerName", "date", "id", "orderId", "status", "userId", "value" FROM "revenues";
DROP TABLE "revenues";
ALTER TABLE "new_revenues" RENAME TO "revenues";
CREATE UNIQUE INDEX "revenues_orderId_key" ON "revenues"("orderId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
