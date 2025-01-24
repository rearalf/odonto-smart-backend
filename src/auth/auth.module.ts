import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import {
  jwtModuleAsyncOptions,
  passportRegister,
} from 'src/config/passport.config';

import { PermissionService } from 'src/permission/permission.service';
import { UserSession } from './entities/user-session.entity';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Global()
@Module({
  providers: [
    AuthService,
    JwtStrategy,
    PermissionService,
    RoleService,
    UserService,
  ],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, UserSession]),
    PassportModule.register(passportRegister),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    PermissionModule,
    RoleModule,
    UserModule,
  ],
  exports: [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    PermissionService,
    RoleService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
