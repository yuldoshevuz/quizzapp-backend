import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';
import { UserDataResponseDto } from './dto/user-data-response.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@Req() req: RequestWithUser): Promise<UserDataResponseDto> {
    return await this.userService.getProfile(req);
  }

  @Get('photo')
  async getProfilePhoto(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    return await this.userService.getProfilePhoto(req, res);
  }
}
