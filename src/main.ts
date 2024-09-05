import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './common/exceptions/validation.exception';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationError: ValidationError[]) => {
        const errors = validationError.map(error => ({
          property: error.property,
          constraints: error.constraints
        }));

        return new ValidationException(errors);
      },
      stopAtFirstError: true
    })
  );


  await app.listen(3000);
}
bootstrap();
