import { Card } from "./card.interface";

export interface Library {
    id: string;
    userId: string;
    card: Card;
    createdAt: Date;
}

export interface CreateLibraryItem {
    userId: string;
    cardId: string;
}