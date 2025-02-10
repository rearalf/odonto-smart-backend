import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserPermission } from './entities/user-permission.entity';

import { UserPermissionService } from './user-permission.service';

@Module({
  controllers: [],
  exports: [UserPermissionService],
  providers: [UserPermissionService],
  imports: [TypeOrmModule.forFeature([UserPermission])],
})
export class UserPermissionModule {}
