import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from 'src/modules/auth/dto/auth-user.dto';
import UserRepository from 'src/repository/user.repository';
import { UserResponseDataDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) {}

    async authenticationUser(dto: AuthUserDto): Promise<UserResponseDataDto> {
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
}
