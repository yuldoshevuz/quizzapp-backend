import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "src/repository/category.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoriesDataResponseDto, CategoryDataResponseDto } from "./dto/category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async create(dto: CreateCategoryDto, req: RequestWithUser): Promise<CategoryDataResponseDto> {
        if (dto.parentId) {
            const authorId = req.user.id;
            const existsCategory = await this.categoryRepository.findById(dto.parentId, authorId);
            if (!existsCategory) throw new BadRequestException('Parent Category not available with this id');
        }

        const slug = this.slugger(dto.title);
        
        const newCategory = await this.categoryRepository.create({ ...dto, slug });
        return { category: newCategory, };
    }

    async getAll(req: RequestWithUser): Promise<CategoriesDataResponseDto> {
        const authorId = req.user.id;
        const categories = await this.categoryRepository.findAll({
            parentId: null,
            cards: { every: { authorId } }
        });

        if (!categories.length) throw new NotFoundException("No categories found");

        return { categories };
    }

    async getBySlug(slug: string, req: RequestWithUser): Promise<CategoryDataResponseDto> {
        const authorId = req.user.id;
        const category = await this.categoryRepository.findBySlug(slug, authorId);
        
        if (!category) throw new NotFoundException("Category not found");
        
        return { category };
    }

    async update(categoryId: string, dto: UpdateCategoryDto, req: RequestWithUser): Promise<CategoryDataResponseDto> {
        const authorId = req.user.id
        const updatedCategory = await this.categoryRepository.updateById(categoryId, {
            ...dto, slug: dto.title? this.slugger(dto.title) : undefined
        }, authorId);
        return { category: updatedCategory };
    }

    async delete(categoryId: string): Promise<null> {
        await this.categoryRepository.deleteById(categoryId);
        return null;
    }

    private slugger(title: string): string {
        return title
            .toLocaleLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('\'', '') + '-' + Date.now();
    }
}