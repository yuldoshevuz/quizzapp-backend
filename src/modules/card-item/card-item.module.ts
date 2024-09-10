import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repository/repository.module";
import { CardItemController } from "./card-item.controller";
import { CardItemService } from "./card-item.service";
import { ConfigModule } from "@nestjs/config";
import { OcrModule } from "../ocr/ocr.module";

@Module({
    imports: [RepositoryModule, ConfigModule, OcrModule],
    controllers: [CardItemController],
    providers: [CardItemService]
})
export class CardItemModule {}