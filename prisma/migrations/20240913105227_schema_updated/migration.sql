-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "views" SERIAL NOT NULL;
