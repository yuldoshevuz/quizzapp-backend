import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './common/exceptions/validation.exception';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './common/swagger/swagger';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import './bot/bot';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cors());

    app.setGlobalPrefix('api');

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (validationError: ValidationError[]) => {
                const errors = validationError.map(({ property, constraints, children }) => ({
                    property, constraints,
                    children: children.map(({ property, constraints }) => ({
                        property, constraints
                    }))
                }));

                return new ValidationException(errors);
            },
            stopAtFirstError: true
        })
    );

    setupSwagger(app);

    await app.listen(process.env.PORT || 4565);
}
bootstrap();
