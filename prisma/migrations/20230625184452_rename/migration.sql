/*
  Warnings:

  - You are about to drop the `MylinxHit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MylinxHit" DROP CONSTRAINT "MylinxHit_kyteId_fkey";

-- DropTable
DROP TABLE "MylinxHit";

-- CreateTable
CREATE TABLE "MylinxView" (
    "id" TEXT NOT NULL,
    "kyteId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "country" TEXT,
    "ip" TEXT,
    "device" TEXT,

    CONSTRAINT "MylinxView_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MylinxView" ADD CONSTRAINT "MylinxView_kyteId_fkey" FOREIGN KEY ("kyteId") REFERENCES "MylinxProd"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
