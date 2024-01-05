-- AlterTable
ALTER TABLE "User" ALTER COLUMN "stripeCustomerId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
