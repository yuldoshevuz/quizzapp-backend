import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isPublic: boolean;

  @IsString()
  @IsOptional()
  categoryId?: string;
}
