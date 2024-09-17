import { PaginationDto } from 'src/modules/card/dto/card.dto';
import { Category } from 'src/repository/interfaces/category.interface';

export class CategoryDataResponseDto {
  category: Category;
}

export class CategoriesDataResponseDto {
  categories: Category[];
  pagination?: PaginationDto;
}
