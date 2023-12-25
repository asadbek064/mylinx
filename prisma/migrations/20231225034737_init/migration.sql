-- RenameForeignKey
ALTER TABLE "HitLink" RENAME CONSTRAINT "HitLink_kyteId_fkey" TO "HitLink_mylinxId_fkey";

-- RenameForeignKey
ALTER TABLE "HitPage" RENAME CONSTRAINT "HitPage_kyteId_fkey" TO "HitPage_mylinxId_fkey";
