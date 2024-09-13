import { Card } from 'src/repository/interfaces/card.interface';

export class CardDataResponseDto {
  card: Card;
}

export class CardsDataResponseDto {
  cards: Card[];
}
