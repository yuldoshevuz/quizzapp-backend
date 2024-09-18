import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Chemistry' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: '6c90b73e-99bb-43e8-85a0-1d7d95120add' })
  @IsString()
  @IsOptional()
  parentId?: string;
}
