import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { Card } from 'src/repository/interfaces/card.interface';

export class PaginationDto {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class CardDataResponseDto {
  card: Card;
}

export class CardsDataResponseDto {
  cards: Card[];
  pagination?: PaginationDto;
}

export class CardsQuery {
  @ApiPropertyOptional({ description: 'Number of elements on page' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageSize: number;

  @ApiPropertyOptional({ description: 'Page sequence number' })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageNumber: number;
}
