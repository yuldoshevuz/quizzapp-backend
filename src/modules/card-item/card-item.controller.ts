import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CardItemService } from './card-item.service';
import { CheckAnswerInputDto } from './dto/check-answer-input.dto';
import { TestAnswerInputDto } from './dto/test-answer-input.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckAnswerImageDto } from './dto/check-answer-image.dto';
import { FileUploadService } from '../../common/services/file-upload.service';

@Controller('card-item')
@Auth()
export class CardItemController {
  constructor(private readonly cardItemService: CardItemService) {}

  @Post('check')
  async checkAnswer(@Body() checkAnswerInputDto: CheckAnswerInputDto) {
    return this.cardItemService.checkAnswer(checkAnswerInputDto);
  }

  @Post('test')
  async testAnswer(@Body() testAnswerInputDto: TestAnswerInputDto) {
    return this.cardItemService.testAnswer(testAnswerInputDto);
  }

  @Post('check/image')
  @UseInterceptors(
    FileInterceptor('image', new FileUploadService().uploadFileOptions()),
  )
  async(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Body() dto: CheckAnswerImageDto,
  ) {
    return this.cardItemService.checkAnswerImage({ ...dto, file });
  }
}
