import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import UserRepository from 'src/repository/user.repository';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;

        if (!user || user.role !== 'ADMIN') throw new ForbiddenException('You do not have permission to access this resource');

        return true;
    }
}