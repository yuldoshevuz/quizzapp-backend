import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';
import { UserDataResponseDto } from './dto/user-data-response.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { LibraryService } from './library/library.service';
import { CreateLibraryDto } from './library/dto/create-library.dto';

@Controller('user')
@Auth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly libraryService: LibraryService,
  ) {}

  @Get()
  async getProfile(@Req() req: RequestWithUser): Promise<UserDataResponseDto> {
    return await this.userService.getProfile(req);
  }

  @Get('library')
  async getLibrary(@Req() req: RequestWithUser) {
    return this.libraryService.getAll(req);
  }

  @Post('library')
  async create(@Req() req: RequestWithUser, @Body() dto: CreateLibraryDto) {
    return this.libraryService.createNewItem(req, dto);
  }

  @Get('photo')
  async getProfilePhoto(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    return await this.userService.getProfilePhoto(req, res);
  }
}
