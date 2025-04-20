import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserPermissionServices } from './services/user-permission.service';
import { RolePermissionService } from './services/role-permission.service';
import { PermissionService } from './services/permission.service';
import { UserRoleService } from './services/user-role.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

import { PermissionController } from './controller/permission.controller';
import { RoleController } from './controller/role.controller';
import { UserController } from './controller/user.controller';

import { RolePermission } from './entities/role-permission.entity';
import { UserPermission } from './entities/user-permission.entity';
import { Permission } from './entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { Role } from './entities/role.entity';

@Module({
  controllers: [UserController, PermissionController, RoleController],
  imports: [
    TypeOrmModule.forFeature([
      Role,
      UserRole,
      Permission,
      RolePermission,
      UserPermission,
    ]),
  ],
  providers: [
    UserService,
    RoleService,
    UserRoleService,
    PermissionService,
    RolePermissionService,
    UserPermissionServices,
  ],
  exports: [UserService],
})
export class UserModule {}
