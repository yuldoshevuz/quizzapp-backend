import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CardRepository } from 'src/repository/card.repository';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { CardDataResponseDto, CardsDataResponseDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AnswerDto } from '../card-item/dto/card-item.dto';
import { CategoryRepository } from 'src/repository/category.repository';
import { CreateCardItem } from 'src/repository/interfaces/card.item.interface';

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(
    dto: CreateCardDto,
    req: RequestWithUser,
  ): Promise<CardDataResponseDto> {
    const authorId = req.user.id;
    const slug = this.slugger(dto.title);

    if (dto.categoryId) {
      const existsCategory = await this.categoryRepository.findById(
        dto.categoryId,
        authorId,
      );
      if (!existsCategory)
        throw new BadRequestException('Category not available with this id');
    }

    const newCard = await this.cardRepository.create({
      ...dto,
      authorId,
      slug,
    });

    return { card: { ...newCard, shareLink: this.shareLink(newCard.slug) } };
  }

  async updateById(
    cardId: string,
    dto: UpdateCardDto,
    req: RequestWithUser,
  ): Promise<CardDataResponseDto> {
    const { title, categoryId } = dto;
    const authorId = req.user.id;

    if (categoryId) {
      const existsCategory = await this.categoryRepository.findById(
        categoryId,
        authorId,
      );
      if (!existsCategory)
        throw new BadRequestException('Category not available with this id');
    }

    const updatedCard = await this.cardRepository.updateById(cardId, authorId, {
      title,
      categoryId,
      slug: title ? this.slugger(title) : undefined,
    });

    return {
      card: { ...updatedCard, shareLink: this.shareLink(updatedCard.slug) },
    };
  }

  async deleteById(cardId: string, req: RequestWithUser): Promise<null> {
    const authorId = req.user.id;
    await this.cardRepository.deleteById(cardId, authorId);
    return null;
  }

  async getMy(req: RequestWithUser): Promise<CardsDataResponseDto> {
    const authorId = req.user.id;
    const cards = await this.cardRepository.findAll({ authorId });

    if (!cards.length) throw new NotFoundException('No cards found');

    return {
      cards: cards.map((card) => ({
        ...card,
        shareLink: this.shareLink(card.slug),
      })),
    };
  }

  async getBySlug(
    slug: string,
    answer: AnswerDto,
  ): Promise<CardDataResponseDto> {
    const card = await this.cardRepository.findOne({ slug }, answer === 'true');

    if (!card) throw new NotFoundException('Card not found');

    return { card: { ...card, shareLink: this.shareLink(card.slug) } };
  }

  async getMyById(
    cardId: string,
    req: RequestWithUser,
  ): Promise<CardDataResponseDto> {
    const authorId = req.user.id;
    const card = await this.cardRepository.findOne({ id: cardId, authorId });

    if (!card) throw new NotFoundException('Card not found');

    return { card: { ...card, shareLink: this.shareLink(card.slug) } };
  }

  async addItem(
    cardId: string,
    dto: CreateCardItem,
    req: RequestWithUser,
  ): Promise<CardDataResponseDto> {
    const existsCard = await this.getMyById(cardId, req);
    const authorId = req.user.id;

    const updatedCards = await this.cardRepository.newCardItem(
      dto,
      cardId,
      authorId,
    );
    return { card: { ...updatedCards, shareLink: existsCard.card.shareLink } };
  }

  private slugger(title: string): string {
    return (
      title.toLocaleLowerCase().replaceAll(' ', '-').replaceAll("'", '') +
      '-' +
      Date.now()
    );
  }

  private shareLink(slug: string): string {
    return `${process.env.BASE_URL}/card/slug/${slug}`;
  }
}
