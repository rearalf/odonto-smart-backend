import { Module } from '@nestjs/common';

import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './services/permission.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  controllers: [UserController, PermissionController],
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [UserService, PermissionService],
})
export class UserModule {}
