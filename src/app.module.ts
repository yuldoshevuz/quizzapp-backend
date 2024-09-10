import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryModule } from './modules/category/category.module';
import { ResponseInterceptor } from './common/interceptors/reponse.interceptor';
import { CardModule } from './modules/card/card.module';
import { CardItemModule } from './modules/card-item/card-item.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        CategoryModule,
        CardModule,
        CardItemModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        }
    ]
})
export class AppModule { }
