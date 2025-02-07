import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserRoleModule } from 'src/user-role/user-role.module';
import { PersonModule } from 'src/person/person.module';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [
    RoleModule,
    PersonModule,
    UserRoleModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class UserModule {}
