import { Injectable, NotFoundException } from '@nestjs/common';
import { CardItemRepository } from 'src/repository/card-item.repository';
import { CardRepository } from 'src/repository/card.repository';
import { CheckAnswerInputDto } from './dto/check-answer-input.dto';
import { TestAnswerInputDto } from './dto/test-answer-input.dto';
import {
  CardItemCheckDto,
  CardItemTestDto,
  CardItemTestOptions,
} from './dto/card-item.dto';
import { Card } from 'src/repository/interfaces/card.interface';
import { CheckAnswerImageDto } from './dto/check-answer-image.dto';
import { OcrService } from '../ocr/ocr.service';
import * as path from 'path';
import * as fs from 'fs';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class CardItemService {
  constructor(
    private readonly cardItemRepository: CardItemRepository,
    private readonly cardRepository: CardRepository,
    private readonly ocrService: OcrService,
  ) {}

  async checkAnswer(dto: CheckAnswerInputDto): Promise<CardItemCheckDto> {
    const cardItem = await this.cardItemRepository.findById(
      dto.cardItemId,
      true,
    );

    if (!cardItem) throw new NotFoundException('Card item not found');

    return {
      correct: cardItem.definition === dto.answer,
      yours: dto.answer,
      answer: cardItem.definition,
      hint: this.makeHint(cardItem.definition),
    };
  }

  async checkAnswerImage(dto: CheckAnswerImageDto) {
    try {
      if (!fs.existsSync(dto.file.path))
        throw new ValidationException('No text image found');

      const answer = await this.ocrService.processImage(
        dto.file.path,
        dto.language,
      );

      return await this.checkAnswer({
        answer: answer ? answer.replaceAll('\n', ' ').trim() : null,
        cardItemId: dto.cardItemId,
      });
    } catch (error) {
      throw new ValidationException(error);
    } finally {
      await fs.promises.rm(dto.file.path, { recursive: true });
    }
  }

  async testAnswer(dto: TestAnswerInputDto): Promise<CardItemTestDto> {
    const card = await this.cardRepository.findOne({ id: dto.cardId }, true);
    if (!card) throw new NotFoundException('Card not found');

    const correctOption = card.items.find((item) => item.id === dto.cardItemId);
    const options = this.makeOptions(card, dto.cardItemId);

    return {
      cardId: dto.cardId,
      cardItemId: dto.cardItemId,
      term: correctOption.term,
      options,
    };
  }

  private makeHint(definition: string) {
    const words = definition.split(' ');
    return words
      .map((word) => word.charAt(0) + ' _'.repeat(word.length - 1))
      .join(' ');
  }

  private makeOptions(card: Card, cardItemId: string): CardItemTestOptions[] {
    const correctOption = card.items.find((item) => item.id === cardItemId);
    if (!correctOption)
      throw new NotFoundException('Card item not found in this card');

    const wrongOptions = card.items
      .filter((item) => item.id !== cardItemId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [...wrongOptions, correctOption].sort(
      () => 0.5 - Math.random(),
    );
    return options.map(({ id, definition }) => ({ id, answer: definition }));
  }
}
