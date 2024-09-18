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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('card-item')
@ApiTags('Card Items')
@ApiBearerAuth('access-token')
@Auth()
export class CardItemController {
  constructor(private readonly cardItemService: CardItemService) {}

  @Post('check')
  @ApiOperation({ summary: "Check Card Item's Answer" })
  async checkAnswer(@Body() checkAnswerInputDto: CheckAnswerInputDto) {
    return this.cardItemService.checkAnswer(checkAnswerInputDto);
  }

  @Post('test')
  @ApiOperation({ summary: 'Create a Test' })
  async testAnswer(@Body() testAnswerInputDto: TestAnswerInputDto) {
    return this.cardItemService.testAnswer(testAnswerInputDto);
  }

  @ApiOperation({ summary: "Check Card Item's Answer From Image" })
  @Post('check/image')
  @ApiOperation({ summary: 'Upload a image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', new FileUploadService().uploadFileOptions()),
  )
  async(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    image: Express.Multer.File,
    @Body() dto: CheckAnswerImageDto,
  ) {
    return this.cardItemService.checkAnswerImage({ ...dto, image });
  }
}
