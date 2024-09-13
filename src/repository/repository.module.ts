import { Module } from '@nestjs/common';
import UserRepository from './user.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { CardRepository } from './card.repository';
import { CategoryRepository } from './category.repository';
import { CardItemRepository } from './card-item.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserRepository,
    CategoryRepository,
    CardRepository,
    CardItemRepository,
  ],
  exports: [
    UserRepository,
    CategoryRepository,
    CardRepository,
    CardItemRepository,
  ],
})
export class RepositoryModule {}
