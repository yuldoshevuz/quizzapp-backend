import { CardItem, CreateCardItem } from './card.item.interface';

export interface Card {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  categoryId?: string;
  items?: CardItem[];
  shareLink?: string;
}

export interface CreateCard {
  title: string;
  slug: string;
  authorId: string;
  categoryId?: string;
  items: CreateCardItem[];
}

export interface UpdateCard {
  title?: string;
  slug?: string;
  categoryId?: string;
}
