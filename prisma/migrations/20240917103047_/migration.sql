-- DropForeignKey
ALTER TABLE "library" DROP CONSTRAINT "library_cardId_fkey";

-- DropForeignKey
ALTER TABLE "library" DROP CONSTRAINT "library_userId_fkey";

-- AddForeignKey
ALTER TABLE "library" ADD CONSTRAINT "library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library" ADD CONSTRAINT "library_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
