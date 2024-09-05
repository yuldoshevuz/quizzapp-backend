export interface UserInfo {
    id: string;
    fullName: string;
    telegramId: string;
    phoneNumber: string;
    cards: UsersCard[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UsersCard {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}