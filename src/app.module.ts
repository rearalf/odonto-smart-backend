import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { JoiValidationSchema } from './config/joi.validation';
import { EnvConfig } from './config/env.config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      load: [EnvConfig, typeorm],
      isGlobal: true,
      validationSchema: JoiValidationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...config.get('typeorm'),
        autoLoadEntities: true,
      }),
    }),

    UserModule,

    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
