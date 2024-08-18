/*
  Warnings:

  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "contactId" TEXT NOT NULL,
    CONSTRAINT "users_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("contactId", "createdAt", "fullName", "function", "id", "idnr", "lastAccess", "password", "role", "status", "updateAt", "workload") SELECT "contactId", "createdAt", "fullName", "function", "id", "idnr", "lastAccess", "password", "role", "status", "updateAt", "workload" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
