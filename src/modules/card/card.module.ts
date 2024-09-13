import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RepositoryModule, ConfigModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
