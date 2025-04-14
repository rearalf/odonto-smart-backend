import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './user.service';

import { PermissionController } from './controller/permission.controller';
import { RoleController } from './controller/role.controller';
import { UserController } from './user.controller';

import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';

@Module({
  controllers: [UserController, PermissionController, RoleController],
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [UserService, PermissionService, RoleService],
})
export class UserModule {}
