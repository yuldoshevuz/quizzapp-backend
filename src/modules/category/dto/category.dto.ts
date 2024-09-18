import { Category } from 'src/repository/interfaces/category.interface';

export class CategoryDataResponseDto {
  category: Category;
}

export class CategoriesDataResponseDto {
  categories: Category[];
}
