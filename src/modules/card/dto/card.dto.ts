import { Card } from 'src/repository/interfaces/card.interface';

export class CardDataResponseDto {
  card: Card;
}

export class PaginationDto {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class CardsDataResponseDto {
  cards: Card[];
  pagination?: PaginationDto;
}
