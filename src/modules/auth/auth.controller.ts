import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/modules/auth/dto/auth-user.dto';
import { UserResponseDataDto } from './dto/user-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authorization User' })
  async auth(@Body() dto: AuthUserDto): Promise<UserResponseDataDto> {
    return this.authService.authenticationUser(dto);
  }
}
