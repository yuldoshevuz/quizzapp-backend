import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAnswerInputDto {
  @IsString()
  @IsNotEmpty()
  cardItemId: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}