import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLibraryDto {
  @ApiProperty({ example: 'eb6f289b-ef46-438b-8d9b-6640788c9777' })
  @IsString()
  @IsNotEmpty()
  cardId: string;
}
