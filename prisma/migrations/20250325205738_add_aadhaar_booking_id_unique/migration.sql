/*
  Warnings:

  - A unique constraint covering the columns `[aadhaar,bookingId]` on the table `FamilyMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FamilyMember_aadhaar_key";

-- CreateIndex
CREATE UNIQUE INDEX "FamilyMember_aadhaar_bookingId_key" ON "FamilyMember"("aadhaar", "bookingId");
