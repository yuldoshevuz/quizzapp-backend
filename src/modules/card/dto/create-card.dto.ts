import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateCardItemDto } from 'src/modules/card-item/dto/create-card-item.dto';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @Type(() => CreateCardItemDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsArray()
  items: CreateCardItemDto[];
}
