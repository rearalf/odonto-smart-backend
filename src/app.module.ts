import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { PersonContactModule } from './person_contact/person_contact.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration, typeorm],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    RoleModule,
    UserRoleModule,
    PermissionModule,
    RolePermissionModule,
    UserPermissionModule,
    AuthModule,
    PersonModule,
    PersonTypeModule,
    PersonContactModule,
    SpecialtyModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
