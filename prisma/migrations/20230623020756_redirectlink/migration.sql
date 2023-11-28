/*
  Warnings:

  - You are about to drop the column `redirect` on the `MylinxDraft` table. All the data in the column will be lost.
  - You are about to drop the column `redirect` on the `MylinxProd` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `MylinxDraft` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MylinxDraft" DROP COLUMN "redirect",
ADD COLUMN     "redirectLink" TEXT,
ADD COLUMN     "shouldRedirect" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "MylinxProd" DROP COLUMN "redirect",
ADD COLUMN     "redirectLink" TEXT,
ADD COLUMN     "shouldRedirect" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "MylinxDraft_userId_key" ON "MylinxDraft"("userId");
