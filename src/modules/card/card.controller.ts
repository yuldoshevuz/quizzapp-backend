import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { CardService } from './card.service';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateCardItemDto } from '../card-item/dto/create-card-item.dto';
import { CardsQuery } from './dto/card.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('card')
@ApiTags('Cards')
@ApiBearerAuth('access-token')
@Auth()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({ summary: 'Create New Card' })
  async create(
    @Body() createCardDto: CreateCardDto,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.create(createCardDto, req);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Cards List' })
  async getAll(@Query() query: CardsQuery) {
    return this.cardService.getAll(query.pageSize, query.pageNumber);
  }

  @ApiOperation({ summary: 'Search Card (output 5 elements)' })
  @Get('search')
  async searchByTitle(@Query('title') title: string) {
    return this.cardService.searchByTitle(title);
  }

  @ApiOperation({ summary: 'Get Popular Cards (output 10 elements)' })
  @Get('popular')
  async getPopular() {
    return this.cardService.getPopular();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get Recent Cards (output 10 elements)' })
  async getRecent() {
    return this.cardService.getRecent();
  }

  @ApiOperation({ summary: 'Get Card By Slug' })
  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.cardService.getBySlug(slug);
  }

  @ApiOperation({ summary: 'Get My Cards' })
  @Get('my')
  async getMy(@Req() req: RequestWithUser, @Query() query: CardsQuery) {
    return this.cardService.getMy(req, query.pageSize, query.pageNumber);
  }

  @ApiOperation({ summary: 'Get My Card By Id' })
  @Get('my/:cardId')
  async getMyById(
    @Param('cardId') cardId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.getMyById(cardId, req);
  }

  @ApiOperation({ summary: 'Update My Card' })
  @Put(':cardId')
  async updateById(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.updateById(cardId, updateCardDto, req);
  }

  @ApiOperation({ summary: 'Delete My Card' })
  @Delete(':cardId')
  async deleteById(
    @Param('cardId') cardId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.cardService.deleteById(cardId, req);
  }

  @ApiOperation({ summary: 'Add New Card Item to My Card' })
  @Post(':cardId')
  async newCardItem(
    @Param() params: { cardId: string },
    @Req() req: RequestWithUser,
    @Body() dto: CreateCardItemDto,
  ) {
    return this.cardService.addItem(params.cardId, dto, req);
  }
}
