import * as fs from 'fs';
import * as path from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication): void => {
  const swaggerDocument = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), 'public', 'swagger-docs.json'),
      'utf-8',
    ),
  );

  SwaggerModule.setup('api/docs', app, swaggerDocument);
};
