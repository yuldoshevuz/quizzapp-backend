-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "views" SET DEFAULT 1,
ALTER COLUMN "views" DROP DEFAULT;
DROP SEQUENCE "cards_views_seq";
