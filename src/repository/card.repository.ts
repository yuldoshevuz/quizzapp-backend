import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';
import { Card, CreateCard, UpdateCard } from './interfaces/card.interface';
import { CardItemRepository } from './card-item.repository';
import { CreateCardItem } from './interfaces/card.item.interface';
import { CardsDataResponseDto } from 'src/modules/card/dto/card.dto';

@Injectable()
export class CardRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cardItemRepository: CardItemRepository
  ) {}

  async count(where: Prisma.CardWhereInput = {}) {
    return await this.prismaService.card.count({ where });
  }

  async findAll(
    where: Prisma.CardWhereInput = {},
    orderBy: Prisma.CardOrderByWithAggregationInput = {},
    take: number = undefined
  ): Promise<Card[]> {

    return this.prismaService.card.findMany({
      select: { ...this.select(), items: false },
      orderBy,
      where,
      take
    });
  }

  async findWithPagination(
    where: Prisma.CardWhereInput = {},
    pageSize: number = 10,
    pageNumber: number = 0,
    orderBy: Prisma.CardOrderByWithAggregationInput = {},
  ): Promise<CardsDataResponseDto> {
    const psz = Number.isNaN(pageSize)? 10 : pageSize;
    const pnum = Number.isNaN(pageNumber)? 0 : pageNumber;

    const skip =  psz && pnum;
    const take = psz || 10;
    
    const totalItemsCount = await this.prismaService.card.count({ where });
  
    const cards = await this.prismaService.card.findMany({ where, skip, take, orderBy });
  
    return this.pagination(cards, psz, pnum || 0, totalItemsCount);
  }
  
  private pagination(
    cards: Card[], 
    pageSize: number, 
    pageNumber: number, 
    totalItemsCount: number
  ): CardsDataResponseDto {
    return {
      cards: cards.map(card => ({
        ...card,
        shareLink: this.shareLink(card.slug),
      })),
      pagination: {
        currentPage: pageNumber,
        pageSize: cards.length,
        totalItems: totalItemsCount,
        totalPages: Math.ceil(totalItemsCount / pageSize)
      },
    };
  }

  async findOne(
    where: Prisma.CardWhereInput,
    answer?: boolean,
  ): Promise<Card | null> {
    return this.prismaService.card.findFirst({
      select: this.select(answer),
      where,
    });
  }

  async create(data: CreateCard): Promise<Card> {
    const { title, slug, authorId, categoryId, isPublic, items } = data;
    return this.prismaService.card.create({
      select: this.select(),
      data: {
        title,
        slug,
        authorId,
        categoryId,
        isPublic,
        items: { createMany: { data: items } },
      },
    });
  }

  async updateById(
    cardId: string,
    authorId: string,
    data: UpdateCard,
  ): Promise<Card> {
    const card = await this.findOne({ id: cardId, authorId });
    if (!card) throw new NotFoundException('Card not found');

    return this.prismaService.card.update({
      select: this.select(),
      where: { id: cardId },
      data,
    });
  }

  async incrementCardViews(slug: string): Promise<Card> {
    const card = await this.findOne({ slug, isPublic: true });
    if (!card) throw new NotFoundException('Card not found');

    return await this.prismaService.card.update({
      select: this.select(),
      where: { id: card.id },
      data: { views: { increment: 1 } }
    })
  }

  async deleteById(cardId: string, authorId: string): Promise<void> {
    const card = await this.findOne({ id: cardId, authorId });
    if (!card) throw new NotFoundException('Card not found');

    await this.prismaService.card.delete({ where: { id: cardId } });
  }

  async newCardItem(
    data: CreateCardItem,
    cardId: string,
    authorId: string,
  ): Promise<Card | null> {
    await this.prismaService.cardItem.create({ data: { ...data, cardId } });
    return this.findOne({ id: cardId, AND: { authorId } });
  }

  private shareLink(slug: string): string {
    return `${process.env.BASE_URL}/api/card/slug/${slug}`;
  }

  public select(answer: boolean = false): Prisma.CardSelect {
    return {
      id: true,
      title: true,
      slug: true,
      authorId: true,
      categoryId: true,
      isPublic: true,
      views: true,
      createdAt: true,
      updatedAt: true,
      items: { select: this.cardItemRepository.select(answer) },
    };
  }
}
