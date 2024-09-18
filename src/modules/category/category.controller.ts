import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth('access-token')
@Auth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Create New Category (admin)' })
  async createCategory(
    @Req() req: RequestWithUser,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categoryService.create(dto, req);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Categories (user)' })
  async getAllCategories(@Req() req: RequestWithUser) {
    return this.categoryService.getAll(req);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get Category By Slug (user)' })
  async getCategoryBySlug(
    @Param('slug') slug: string,
    @Req() req: RequestWithUser,
  ) {
    return this.categoryService.getBySlug(slug, req);
  }

  @Put(':categoryId')
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Update Category (admin)' })
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Req() req: RequestWithUser,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, dto, req);
  }

  @Delete(':categoryId')
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Delete Category (admin)' })
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.delete(categoryId);
  }
}
