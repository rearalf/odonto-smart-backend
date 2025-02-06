import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PersonSpecialtyModule } from './person-specialty/person-specialty.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { PersonContactModule } from './person_contact/person_contact.module';
import { PersonTypeModule } from './person-type/person-type.module';
import { PermissionModule } from './permission/permission.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { JoiValidationSchema } from './config/joi.validation';
import { UserRoleModule } from './user-role/user-role.module';
import { PatientModule } from './patient/patient.module';
import { EnvConfiguration } from './config/env.config';
import { PersonModule } from './person/person.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm';

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
    AuthModule,
    PersonModule,
    PatientModule,
    UserRoleModule,
    SpecialtyModule,
    PermissionModule,
    PersonTypeModule,
    PersonContactModule,
    RolePermissionModule,
    UserPermissionModule,
    PersonSpecialtyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
