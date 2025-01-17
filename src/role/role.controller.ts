import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { RoleService } from './role.service';

import { Role } from './entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({ description: 'Create a new role', type: Role })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get(':id')
  @ApiResponse({ description: 'Finding role by Id', type: Role })
  findUserById(@Param('id') id: number) {
    return this.roleService.findRoleById(id);
  }

  @Get()
  @ApiResponse({ description: 'Finding all roles' })
  findRoles() {
    return this.roleService.findRoles();
  }

  @Patch(':id')
  @ApiResponse({ description: 'Updating role data' })
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleting role' })
  deleteUser(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
