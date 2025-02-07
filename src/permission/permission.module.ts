import { forwardRef, Module } from '@nestjs/common';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  exports: [PermissionService],
  providers: [PermissionService],
  imports: [forwardRef(() => UserModule), forwardRef(() => RoleModule)],
  controllers: [PermissionController],
})
export class PermissionModule {}
