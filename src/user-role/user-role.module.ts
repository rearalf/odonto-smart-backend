import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserRole } from './entities/user-role.entity';
import { UserRoleService } from './user-role.service';

@Module({
  controllers: [],
  exports: [UserRoleService],
  providers: [UserRoleService],
  imports: [TypeOrmModule.forFeature([UserRole])],
})
export class UserRoleModule {}
