import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';

// import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
// import { PERMISSIONS_ENUM, TABLES_ENUM } from 'src/config/permissions.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiSecurity('access_cookie')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ description: 'Create a new user', type: User })
  // @RequirePermissions(PERMISSIONS_ENUM.CREATE + TABLES_ENUM.USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiResponse({ description: 'Finding user by Id', type: User })
  // @RequirePermissions(PERMISSIONS_ENUM.VIEW + TABLES_ENUM.USER)
  findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Get()
  @ApiResponse({ description: 'Finding all user' })
  // @RequirePermissions(PERMISSIONS_ENUM.VIEW + TABLES_ENUM.USER + 's')
  findUsers() {
    return this.userService.findUsers();
  }

  @Patch(':id')
  @ApiResponse({ description: 'Updating user data' })
  // @RequirePermissions(PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.USER)
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleting user' })
  // @RequirePermissions(PERMISSIONS_ENUM.DELETE + TABLES_ENUM.USER)
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
