-- DropForeignKey
ALTER TABLE "Domains" DROP CONSTRAINT "Domains_userId_fkey";

-- DropForeignKey
ALTER TABLE "HitLink" DROP CONSTRAINT "HitLink_kyteId_fkey";

-- DropForeignKey
ALTER TABLE "HitPage" DROP CONSTRAINT "HitPage_kyteId_fkey";

-- DropForeignKey
ALTER TABLE "MylinxDraft" DROP CONSTRAINT "MylinxDraft_userId_fkey";

-- DropForeignKey
ALTER TABLE "MylinxProd" DROP CONSTRAINT "MylinxProd_userId_fkey";

-- AddForeignKey
ALTER TABLE "Domains" ADD CONSTRAINT "Domains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HitPage" ADD CONSTRAINT "HitPage_kyteId_fkey" FOREIGN KEY ("kyteId") REFERENCES "MylinxProd"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HitLink" ADD CONSTRAINT "HitLink_kyteId_fkey" FOREIGN KEY ("kyteId") REFERENCES "MylinxProd"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MylinxDraft" ADD CONSTRAINT "MylinxDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MylinxProd" ADD CONSTRAINT "MylinxProd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
