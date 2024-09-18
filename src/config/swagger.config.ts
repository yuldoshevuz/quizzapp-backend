import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .addServer(process.env.BASE_URL, 'Production Server')
    .addServer(`http://localhost:${process.env.PORT}`, 'Development Server')
    .setTitle('QuizApp Back-end API')
    .setDescription(
      'API for managing users, cards, and card items in the QuizApp application.',
    )
    .setVersion('1.0.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Cards')
    .addTag('Card Items')
    .addTag('Category')
    .setContact(
      'Muhammadali Yuldoshev',
      'http://yuldoshev.uz',
      'mukhammadaliweb@gmail.com',
    )
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
