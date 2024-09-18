import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardItemDto {
  @ApiProperty({ example: 'Ahvollar qalay?' })
  @IsString()
  @IsNotEmpty()
  term: string;

  @ApiProperty({ example: 'How are you?' })
  @IsString()
  @IsNotEmpty()
  definition: string;
}
