import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { bot } from 'src/bot/bot';
import { UserProfilePhotos } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class PhotoService {
  private readonly DEFAULT_PROFILE_PHOTO: string;

  constructor(private readonly configService: ConfigService) {
    this.DEFAULT_PROFILE_PHOTO = configService.get<string>(
      'DEFAULT_PROFILE_PHOTO',
    );
  }

  public async profilePhotoFetcher(telegramId: string): Promise<string> {
    const userPhotos = await this.getUserProfilePhotos(telegramId);

    if (!userPhotos || userPhotos.total_count === 0) {
      return this.DEFAULT_PROFILE_PHOTO;
    }

    const imageLink = await this.getFirstPhotoLink(userPhotos);
    if (!imageLink) {
      throw new InternalServerErrorException('Failed to fetch photo link');
    }

    return imageLink.href;
  }

  private async getUserProfilePhotos(
    telegramId: string,
  ): Promise<UserProfilePhotos | null> {
    try {
      return await bot.telegram.getUserProfilePhotos(+telegramId, 0, 1);
    } catch (error) {
      return null;
    }
  }

  private async getFirstPhotoLink(
    userPhotos: UserProfilePhotos,
  ): Promise<URL | null> {
    try {
      const firstPhoto = userPhotos.photos[0][0];
      return await bot.telegram.getFileLink(firstPhoto);
    } catch (error) {
      return null;
    }
  }
}
