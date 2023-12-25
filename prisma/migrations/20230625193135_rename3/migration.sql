/*
  Warnings:

  - You are about to drop the `MylinxView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MylinxViewLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MylinxView" DROP CONSTRAINT "MylinxView_kyteId_fkey";

-- DropForeignKey
ALTER TABLE "MylinxViewLink" DROP CONSTRAINT "MylinxViewLink_kyteId_fkey";

-- DropTable
DROP TABLE "MylinxView";

-- DropTable
DROP TABLE "MylinxViewLink";

-- CreateTable
CREATE TABLE "HitLink" (
    "id" TEXT NOT NULL,
    "mylinxId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "country" TEXT,
    "ip" TEXT,
    "device" TEXT,

    CONSTRAINT "HitLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HitPage" (
    "id" TEXT NOT NULL,
    "mylinxId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referrer" TEXT,
    "country" TEXT,
    "ip" TEXT,
    "device" TEXT,
    "link" TEXT,

    CONSTRAINT "HitPage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HitLink" ADD CONSTRAINT "HitLink_kyteId_fkey" FOREIGN KEY ("mylinxId") REFERENCES "MylinxProd"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HitPage" ADD CONSTRAINT "HitPage_kyteId_fkey" FOREIGN KEY ("mylinxId") REFERENCES "MylinxProd"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
