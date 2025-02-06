import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

  app.use(cookieParser());
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.setGlobalPrefix(`api`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Odonto Smart')
    .setDescription('This is the documentation about a odonto smart.')
    .setVersion('0.0.1')
    .addSecurity('access_cookie', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
    })
    .addSecurity('refresh_cookie', {
      type: 'apiKey',
      in: 'cookie',
      name: 'refresh_token',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
