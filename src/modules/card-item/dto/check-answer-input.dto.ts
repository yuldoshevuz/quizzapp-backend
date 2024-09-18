import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAnswerInputDto {
  @ApiProperty({ example: 'eb6f289b-ef46-438b-8d9b-6640788c9777' })
  @IsString()
  @IsNotEmpty()
  cardItemId: string;

  @ApiProperty({ example: 'How are you?' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
