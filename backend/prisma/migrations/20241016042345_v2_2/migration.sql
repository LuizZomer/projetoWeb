/*
  Warnings:

  - A unique constraint covering the columns `[revenueId]` on the table `finances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "finances_revenueId_key" ON "finances"("revenueId");
