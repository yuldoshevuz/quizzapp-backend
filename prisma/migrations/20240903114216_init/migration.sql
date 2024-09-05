/*
  Warnings:

  - A unique constraint covering the columns `[id,authorId,slug,title]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,cardId,term,definition]` on the table `CardItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,parentId,title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,telegramId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_id_authorId_slug_title_key" ON "Card"("id", "authorId", "slug", "title");

-- CreateIndex
CREATE UNIQUE INDEX "CardItem_id_cardId_term_definition_key" ON "CardItem"("id", "cardId", "term", "definition");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_parentId_title_key" ON "Category"("id", "parentId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_telegramId_key" ON "User"("id", "telegramId");
