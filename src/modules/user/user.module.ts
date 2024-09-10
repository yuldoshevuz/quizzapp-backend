import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from 'src/repository/repository.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [ConfigModule, RepositoryModule, PhotoModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
