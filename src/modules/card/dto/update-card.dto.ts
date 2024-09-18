import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({ example: "Inglizcha yangi lug'atlar to'plami" })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isPublic: boolean;

  @ApiProperty({ example: 'fl46bcd0-4554-409e-b439-095cffdf8953' })
  @IsString()
  @IsOptional()
  categoryId?: string;
}
