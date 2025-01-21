import { ApiResponse } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';

import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ description: 'Create a new user', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @RequirePermissions('view_user')
  @ApiResponse({ description: 'Finding user by Id', type: User })
  findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get()
  @RequirePermissions('view_users')
  @ApiResponse({ description: 'Finding all user' })
  findUsers() {
    return this.userService.findUsers();
  }

  @Patch(':id')
  @ApiResponse({ description: 'Updating user data' })
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleting user' })
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
