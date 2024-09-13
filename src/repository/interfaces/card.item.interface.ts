export interface CardItem {
  id: string;
  term: string;
  definition?: string;
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCardItem {
  term: string;
  definition: string;
}
