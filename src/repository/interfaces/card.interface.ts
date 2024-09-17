import { Prisma } from '@prisma/client';
import { CardItem, CreateCardItem } from './card.item.interface';

export interface Card {
  id: string;
  title: string;
  slug: string;
  authorId: string;
  categoryId?: string;
  isPublic: boolean;
  views: number;
  items?: CardItem[];
  shareLink?: string;
}

export interface CreateCard {
  title: string;
  slug: string;
  isPublic: boolean;
  authorId: string;
  categoryId?: string;
  items: CreateCardItem[];
}

export interface UpdateCard {
  title?: string;
  slug?: string;
  isPublic?: boolean;
  categoryId?: string;
}
