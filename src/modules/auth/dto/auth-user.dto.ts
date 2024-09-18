import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
