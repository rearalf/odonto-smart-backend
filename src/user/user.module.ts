import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './entities/user.entity';

import { UserPermissionModule } from 'src/user-permission/user-permission.module';
import { PermissionModule } from 'src/permission/permission.module';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { PersonModule } from 'src/person/person.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => PermissionModule),
    forwardRef(() => RoleModule),
    UserPermissionModule,
    UserRoleModule,
    PersonModule,
  ],
})
export class UserModule {}
