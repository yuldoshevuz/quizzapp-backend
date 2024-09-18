import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Prisma } from '@prisma/client';
import { CardRepository } from './card.repository';
import { CreateLibraryItem, Library } from './interfaces/library.interface';

@Injectable()
export class LibraryRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cardRepository: CardRepository,
  ) {}

  async findAll(
    userId: string,
    where: Prisma.LibraryWhereInput = {},
  ): Promise<Library[]> {
    return this.prismaService.library.findMany({
      where: { userId, ...where },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: this.select(),
    });
  }

  async findOne(where: Prisma.LibraryWhereInput) {
    return await this.prismaService.library.findFirst({ where });
  }

  async create(data: CreateLibraryItem) {
    await this.prismaService.library.create({
      select: this.select(),
      data,
    });
  }

  async delete(authorId: string, cardId: string): Promise<void> {
    const existsCard = await this.prismaService.library.findFirst({
      where: {
        AND: [{ cardId }, { userId: authorId }],
      },
    });

    if (!existsCard) throw new NotFoundException('Card not found your library');

    await this.prismaService.library.delete({
      where: { id: existsCard.id },
    });
  }

  private select() {
    return {
      id: true,
      userId: true,
      card: { select: this.cardRepository.select() },
      createdAt: true,
    };
  }
}
