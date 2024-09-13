import { IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
