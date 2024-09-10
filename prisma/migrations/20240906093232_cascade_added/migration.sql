-- DropForeignKey
ALTER TABLE "card_items" DROP CONSTRAINT "card_items_cardId_fkey";

-- AddForeignKey
ALTER TABLE "card_items" ADD CONSTRAINT "card_items_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
