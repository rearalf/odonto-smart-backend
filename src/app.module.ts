import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { JoiValidationSchema } from './config/joi.validation';
import { EnvConfig } from './config/env.config';
import typeorm from './config/typeorm';

import { AppointmentModule } from './appointment/appointment.module';
import { OdontogramModule } from './odontogram/odontogram.module';
import { PatientModule } from './patient/patient.module';
import { PersonModule } from './person/person.module';
import { DoctorModule } from './doctor/doctor.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

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
    DoctorModule,
    PatientModule,
    OdontogramModule,
    AppointmentModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
