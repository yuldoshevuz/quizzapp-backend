import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/common/services/prisma.service";
import { User } from "./interfaces/user.interface";

@Injectable()
class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}
    
    async create(data: Prisma.UserCreateWithoutCardsInput): Promise<User> {
        return await this.prismaService.user.create({ select: this.select(), data });
    }

    async findOne(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prismaService.user.findFirst({ select: this.select(), where });
    }

    async findById(userId: string): Promise<User | null> {
        return await this.findOne({ id: userId });
    }

    async findByTelegramId(telegramId: string): Promise<User | null> {
        return await this.findOne({ telegramId });
    }

    private select(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            telegramId: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    }
}

export default UserRepository;