import { IsNotEmpty, IsString } from 'class-validator';

export class CheckAnswerImageDto {
  @IsString()
  @IsNotEmpty()
  cardItemId: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  file?: Express.Multer.File;
}
