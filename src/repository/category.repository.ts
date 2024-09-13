import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from './interfaces/category.interface';
import { CreateCategoryDto } from 'src/modules/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/modules/category/dto/update-category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(where: Prisma.CategoryWhereInput = {}): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where,
      include: { children: true, cards: true },
    });
  }

  async findById(
    categoryId: string,
    authorId: string,
  ): Promise<Category | null> {
    return this.prismaService.category.findUnique({
      where: {
        id: categoryId,
        cards: { every: { authorId } },
      },
      include: { children: true, cards: true },
    });
  }

  async findBySlug(slug: string, authorId: string): Promise<Category | null> {
    return this.prismaService.category.findFirst({
      where: {
        slug,
        cards: { every: { authorId } },
      },
      include: { children: true, cards: true },
    });
  }

  async create(data: CreateCategory): Promise<Category> {
    return this.prismaService.category.create({ data });
  }

  async updateById(
    categoryId: string,
    data: UpdateCategory,
    authorId: string,
  ): Promise<Category | null> {
    const category = await this.findById(categoryId, authorId);

    if (!category) throw new NotFoundException('Category not found');

    return this.prismaService.category.update({
      where: { id: categoryId },
      data,
    });
  }

  async deleteById(categoryId: string): Promise<void> {
    const category = await this.findById(categoryId, undefined);

    if (!category) throw new NotFoundException('Category not found');

    await this.prismaService.category.delete({ where: { id: categoryId } });
  }
}
