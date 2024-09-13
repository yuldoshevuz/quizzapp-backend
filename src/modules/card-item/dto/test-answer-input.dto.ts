import { IsNotEmpty, IsString } from 'class-validator';

export class TestAnswerInputDto {
  @IsString()
  @IsNotEmpty()
  cardId: string;

  @IsString()
  @IsNotEmpty()
  cardItemId: string;
}
