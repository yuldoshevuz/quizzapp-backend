import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
