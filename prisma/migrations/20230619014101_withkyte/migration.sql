-- CreateTable
CREATE TABLE "MylinxDraft" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "name" TEXT,
    "description" TEXT,
    "pfp" TEXT,
    "theme" TEXT,
    "customFont" TEXT,
    "customColor" TEXT,
    "redirect" TEXT,
    "links" JSONB,
    "icons" JSONB,
    "vcf" JSONB,
    "domains" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "MylinxDraft_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MylinxProd" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "name" TEXT,
    "description" TEXT,
    "pfp" TEXT,
    "theme" TEXT,
    "customFont" TEXT,
    "customColor" TEXT,
    "redirect" TEXT,
    "links" JSONB,
    "icons" JSONB,
    "vcf" JSONB,
    "domains" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "MylinxProd_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MylinxDraft_email_key" ON "MylinxDraft"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MylinxDraft_username_key" ON "MylinxDraft"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MylinxProd_email_key" ON "MylinxProd"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MylinxProd_username_key" ON "MylinxProd"("username");

-- AddForeignKey
ALTER TABLE "MylinxDraft" ADD CONSTRAINT "MylinxDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MylinxProd" ADD CONSTRAINT "MylinxProd_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
