export class CardItemTestDto {
  cardId: string;
  cardItemId: string;
  term: string;
  options: CardItemTestOptions[];
}

export class CardItemTestOptions {
  id: string;
  answer: string;
}

export class CardItemCheckDto {
  correct: boolean;
  yours: string;
  answer: string;
  hint: string;
}

export type AnswerDto = 'true' | 'false';
