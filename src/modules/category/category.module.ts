import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RepositoryModule, ConfigModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
