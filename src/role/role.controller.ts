import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';

// import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
// import { PERMISSIONS_ENUM, TABLES_ENUM } from 'src/config/permissions.config';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiSecurity('access_cookie')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({ description: 'Create a new role', type: Role })
  // @RequirePermissions(PERMISSIONS_ENUM.CREATE + TABLES_ENUM.ROLE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get(':id')
  @ApiResponse({ description: 'Finding role by Id', type: Role })
  // @RequirePermissions(PERMISSIONS_ENUM.VIEW + TABLES_ENUM.ROLE)
  findUserById(@Param('id') id: number) {
    return this.roleService.findRoleById(id);
  }

  @Get()
  @ApiResponse({ description: 'Finding all roles' })
  // @RequirePermissions(PERMISSIONS_ENUM.VIEW + TABLES_ENUM.ROLE + 's')
  findRoles() {
    return this.roleService.findRoles();
  }

  @Patch(':id')
  @ApiResponse({ description: 'Updating role data' })
  // @RequirePermissions(PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.ROLE)
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Deleting role' })
  // @RequirePermissions(PERMISSIONS_ENUM.DELETE + TABLES_ENUM.ROLE)
  deleteUser(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
