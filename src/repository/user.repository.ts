import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/common/services/prisma.service";
import { UserInfo } from "../common/interfaces/user.interface";

@Injectable()
class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}
    
    async create(data: Prisma.UserCreateWithoutCardsInput): Promise<UserInfo> {
        return await this.prismaService.user.create({ select: this.select(), data });
    }

    async findOne(where: Prisma.UserWhereInput): Promise<UserInfo | null> {
        return this.prismaService.user.findFirst({ select: this.select(), where });
    }

    async findById(userId: string): Promise<UserInfo | null> {
        return await this.findOne({ id: userId });
    }

    private select(): Prisma.UserSelect {
        return {
            id: true,
            fullName: true,
            telegramId: true,
            phoneNumber: true,
            cards: {
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            createdAt: true,
            updatedAt: true
        }
    }
}

export default UserRepository;