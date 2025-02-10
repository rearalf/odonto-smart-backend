import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Asegúrate de importar el guard
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserSession } from './entities/user-session.entity';

import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

import {
  jwtModuleAsyncOptions,
  passportRegister,
} from 'src/config/passport.config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, UserSession]),
    PassportModule.register(passportRegister),
    JwtModule.registerAsync(jwtModuleAsyncOptions),
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    PermissionModule, // Si depende del servicio, debe estar en forwardRef
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // Se agrega el guard como provider
  controllers: [AuthController],
  exports: [AuthService, JwtModule, PassportModule, JwtAuthGuard], // Se exporta el guard si otros módulos lo usan
})
export class AuthModule {}
