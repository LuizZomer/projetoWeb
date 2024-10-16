-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_finances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dueDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" TEXT,
    "revenueId" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "finances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "finances_revenueId_fkey" FOREIGN KEY ("revenueId") REFERENCES "revenues" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_finances" ("createdAt", "description", "dueDate", "id", "status", "type", "userId", "value") SELECT "createdAt", "description", "dueDate", "id", "status", "type", "userId", "value" FROM "finances";
DROP TABLE "finances";
ALTER TABLE "new_finances" RENAME TO "finances";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
