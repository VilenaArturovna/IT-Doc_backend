import { ExceptionInterceptor } from '@libs/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalInterceptors(new ExceptionInterceptor());
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      syntaxHighlight: { activate: true, theme: 'agate' },
      tryItOutEnabled: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  };
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('IT-Doc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, customOptions);

  const config = app.get<ConfigService>(ConfigService);

  const PORT = config.get<number>('app.port');

  await app.listen(PORT);
}
bootstrap();
