import { forwardRef, Module } from '@nestjs/common';

import { PermissionModule } from 'src/permission/permission.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  exports: [RoleService],
  providers: [RoleService],
  imports: [forwardRef(() => PermissionModule)],
  controllers: [RoleController],
})
export class RoleModule {}
