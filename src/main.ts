import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  type OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const allowedOrigins: string = configService.get('ALLOWED_ORIGINS') ?? '*';

  app.use(cookieParser(/* process.env.COOKIE_SECRET_KEY */)); // TODO: Implementar secret key
  app.enableCors({
    origin: allowedOrigins === '*' ? true : allowedOrigins.split(','),
    credentials: true,
    exposedHeaders: [],
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const logger = new Logger('Bootstrap');

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Odonto Smart')
      .setDescription('This is the documentation about a odonto smart.')
      .setVersion('0.0.1')
      .build();
    const documentFactory = (): OpenAPIObject =>
      SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3000, () => {
    logger.log(
      `Running on http://${process.env.HOST ?? 'localhost'}:${
        process.env.PORT ?? 3000
      }`,
    );
  });
}
void bootstrap();
