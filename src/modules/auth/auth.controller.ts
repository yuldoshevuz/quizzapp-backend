import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/modules/auth/dto/auth-user.dto';
import { UserResponseDataDto } from './dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Body() dto: AuthUserDto): Promise<UserResponseDataDto> {
    return this.authService.authenticationUser(dto);
  }
}
