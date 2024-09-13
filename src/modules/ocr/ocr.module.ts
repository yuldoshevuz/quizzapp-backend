import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { OcrService } from './ocr.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ocr',
    }),
  ],
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {}
