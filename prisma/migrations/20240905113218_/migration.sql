-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_categoryId_fkey";

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
