import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: 1933002694 })
  @IsNumber()
  @IsNotEmpty()
  telegramId: number;

  @ApiProperty({ example: 'Muhammadali Yuldoshev' })
  @IsString()
  @IsNotEmpty()
  fullName: string;
}
