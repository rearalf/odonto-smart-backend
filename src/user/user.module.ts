import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { PersonModule } from 'src/person/person.module';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [
    PersonModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
})
export class UserModule {}
