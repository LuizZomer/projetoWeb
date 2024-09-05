-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_revenues" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "orderId" TEXT NOT NULL,
    "customerId" TEXT,
    "customerName" TEXT,
    "userId" TEXT,
    CONSTRAINT "revenues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "revenues_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "revenues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_revenues" ("customerId", "date", "description", "id", "orderId", "status", "userId", "value") SELECT "customerId", "date", "description", "id", "orderId", "status", "userId", "value" FROM "revenues";
DROP TABLE "revenues";
ALTER TABLE "new_revenues" RENAME TO "revenues";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
