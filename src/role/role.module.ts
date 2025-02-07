import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionModule } from 'src/permission/permission.module';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Module({
  exports: [RoleService],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => PermissionModule),
  ],
  controllers: [RoleController],
})
export class RoleModule {}
