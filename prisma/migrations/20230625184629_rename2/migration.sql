/*
  Warnings:

  - You are about to drop the `LinkHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkHit" DROP CONSTRAINT "LinkHit_kyteId_fkey";

-- DropTable
DROP TABLE "LinkHit";

-- CreateTable
CREATE TABLE "MylinxViewLink" (
    "id" TEXT NOT NULL,
    "kyteId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "country" TEXT,
    "ip" TEXT,
    "device" TEXT,
    "link" TEXT,

    CONSTRAINT "MylinxViewLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MylinxViewLink" ADD CONSTRAINT "MylinxViewLink_kyteId_fkey" FOREIGN KEY ("kyteId") REFERENCES "MylinxProd"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
