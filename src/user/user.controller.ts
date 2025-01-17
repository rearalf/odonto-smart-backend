import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ description: 'Create a new user', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiResponse({ description: 'Finding user by Id', type: User })
  findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get()
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
