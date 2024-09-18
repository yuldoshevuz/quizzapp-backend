import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TestAnswerInputDto {
  @ApiProperty({ example: '8587605f-6d74-4272-ac1a-784d6d829bb0' })
  @IsString()
  @IsNotEmpty()
  cardId: string;

  @ApiProperty({ example: 'eb6f289b-ef46-438b-8d9b-6640788c9777' })
  @IsString()
  @IsNotEmpty()
  cardItemId: string;
}
