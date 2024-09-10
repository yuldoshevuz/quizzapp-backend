import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Put, Query } from "@nestjs/common";
import { CardService } from "./card.service";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";
import { CreateCardDto } from "./dto/create-card.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { UpdateCardDto } from "./dto/update-card.dto";
import { AnswerDto } from "../card-item/dto/card-item.dto";
import { CreateCardItemDto } from "../card-item/dto/create-card-item.dto";

@Controller('card')
@Auth()
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    async create(@Body() createCardDto: CreateCardDto, @Req() req: RequestWithUser) {
        return this.cardService.create(createCardDto, req);
    }

    @Get('slug/:slug')
    async getBySlug(@Param('slug') slug: string, @Query('answer') answer: AnswerDto) {
        return this.cardService.getBySlug(slug, answer);
    }

    @Get('my')
    async getMy(@Req() req: RequestWithUser) {
        return this.cardService.getMy(req);
    }

    @Get('my/:cardId')
    async getMyById(@Param('cardId') cardId: string, @Req() req: RequestWithUser) {
        return this.cardService.getMyById(cardId, req);
    }


    @Put(':cardId')
    async updateById(@Param('cardId') cardId: string, @Body() updateCardDto: UpdateCardDto, @Req() req: RequestWithUser) {
        return this.cardService.updateById(cardId, updateCardDto, req);
    }

    @Delete(':cardId')
    async deleteById(@Param('cardId') cardId: string, @Req() req: RequestWithUser) {
        return this.cardService.deleteById(cardId, req);
    }

    @Post(':cardId')
    async newCardItem(
        @Param() params: { cardId: string },
        @Req() req: RequestWithUser,
        @Body() dto: CreateCardItemDto
    ){
        return this.cardService.addItem(params.cardId, dto, req);
    }
}