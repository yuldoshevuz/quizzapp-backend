import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PhotoService } from '../photo/photo.service';
import { Response } from 'express';
import { UserDataResponseDto } from './dto/user-data-response.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Injectable()
export class UserService {
  private readonly BASE_URL: string;
  private readonly DEFAULT_PROFILE_PHOTO: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly photoService: PhotoService,
  ) {
    this.BASE_URL = this.configService.get<string>('BASE_URL');
    this.DEFAULT_PROFILE_PHOTO = configService.get<string>(
      'DEFAULT_PROFILE_PHOTO',
    );
  }

  async getProfile(req: RequestWithUser): Promise<UserDataResponseDto> {
    const user = req.user;
    const photo = `${this.BASE_URL}/api/user/photo`;

    return { user: { ...user, photo } };
  }

  async getProfilePhoto(req: RequestWithUser, res: Response): Promise<void> {
    const user = req.user;
    const photoUrl = await this.photoService.profilePhotoFetcher(
      user.telegramId,
    );

    const fileStream = await axios.get(photoUrl, { responseType: 'stream' });

    res.setHeader('Content-Type', 'image/jpeg');
    fileStream.data.pipe(res);
  }
}
