import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: "Inglizcha yangi lug'atlar to'plami" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @ApiProperty({ example: 'fl46bcd0-4554-409e-b439-095cffdf8953' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    type: CreateCardItemDto,
    example: [
      { term: 'Salom', definition: 'Hello' },
      { term: 'Ahvollar qalay?', definition: 'How are you?' },
      { term: 'Nima gap?', definition: 'Whats up?' },
      { term: 'Xayr!', definition: 'Bye!' },
    ],
  })
  @Type(() => CreateCardItemDto)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsArray()
  items: CreateCardItemDto[];
}
