/*
  Warnings:

  - You are about to drop the column `name` on the `orders_log` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `orders_log` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `orders_log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders_log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "orders_log_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_log_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders_log" ("createdAt", "customerId", "id") SELECT "createdAt", "customerId", "id" FROM "orders_log";
DROP TABLE "orders_log";
ALTER TABLE "new_orders_log" RENAME TO "orders_log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
