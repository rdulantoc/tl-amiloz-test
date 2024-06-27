/*
  Warnings:

  - A unique constraint covering the columns `[status]` on the table `InstallmentStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `LoanStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `OfferStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InstallmentStatus_status_key" ON "InstallmentStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "LoanStatus_status_key" ON "LoanStatus"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OfferStatus_status_key" ON "OfferStatus"("status");
