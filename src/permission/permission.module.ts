import { Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, RoleService, UserService],
  exports: [PermissionService],
})
export class PermissionModule {}
