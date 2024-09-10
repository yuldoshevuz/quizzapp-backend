import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/modules/auth/dto/auth-user.dto';
import UserRepository from 'src/repository/user.repository';
import { UserResponseDataDto } from './dto/user-response.dto';
import { bot } from 'src/bot/bot';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class AuthService {
    BASE_URL: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
    ) {}

    async authenticationUser(dto: AuthUserDto): Promise<UserResponseDataDto> {
        const existsUser = await this.checkUserFromTelegram(dto.telegramId);
        if (!existsUser) {
            throw new ValidationException('Telegram does not have a user with this ID');
        }

        let user = await this.userRepository.findOne({ telegramId: String(dto.telegramId) });
        if (!user) {
            const newUser = await this.userRepository.create({ ...dto, telegramId: String(dto.telegramId) });
            user = newUser;
        }

        const accessToken = this.generateToken(user.id);
        return { userId: user.id, accessToken };
    }

    private generateToken(userId: string): string {
        return this.jwtService.sign({ userId });
    }

    private async checkUserFromTelegram(telegramId: number): Promise<boolean> {
        try {
            return await bot.telegram.sendChatAction(telegramId, 'typing');
        } catch (error) {
            return false;
        }
    }
}
