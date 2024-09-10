/*
  Warnings:

  - A unique constraint covering the columns `[id,parentId,slug,title]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_id_parentId_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_parentId_slug_title_key" ON "categories"("id", "parentId", "slug", "title");
