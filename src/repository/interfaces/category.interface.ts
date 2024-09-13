import { Card } from './card.interface';

export interface Category {
  id: string;
  title: string;
  slug: string;
  children?: Category[];
  cards?: Card[];
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategory {
  title: string;
  slug: string;
  parentId?: string;
}

export interface UpdateCategory {
  title?: string;
  slug?: string;
  parentId?: string;
}
