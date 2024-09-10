import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { Prisma } from "@prisma/client";
import { CardItem } from "./interfaces/card.item.interface";

@Injectable()
export class CardItemRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: string, answer?: boolean): Promise<CardItem | null> {
        return this.prismaService.cardItem.findUnique({ select: this.select(answer), where: { id } });
    }

    async updateById(id: string, data: Prisma.CardItemUpdateInput): Promise<CardItem> {
        const cardItem = await this.findById(id);
        if (!cardItem) throw new NotFoundException('Card item not found');
        
        return this.prismaService.cardItem.update({ select: this.select(), where: { id }, data });
    }

    async deleteById(id: string): Promise<void> {
        const cardItem = await this.findById(id);
        if (!cardItem) throw new NotFoundException('Card item not found');
        
        await this.prismaService.cardItem.delete({ where: { id } });
    }
 
    public select(answer: boolean = false): Prisma.CardItemSelect {
        return {
            id: true,
            term: true,
            definition: answer,
            cardId: true,
            createdAt: true,
            updatedAt: true
        }
    }
}