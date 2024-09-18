import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAnswerImageDto {
  @ApiProperty({ example: 'eb6f289b-ef46-438b-8d9b-6640788c9777' })
  @IsString()
  @IsNotEmpty()
  cardItemId: string;

  @ApiProperty({ example: 'eng' })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image?: Express.Multer.File;
}
