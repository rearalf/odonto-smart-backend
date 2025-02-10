import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

import { Permission } from './entities/permission.entity';

@Module({
  exports: [PermissionService],
  providers: [PermissionService],
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
  ],
  controllers: [PermissionController],
})
export class PermissionModule {}
