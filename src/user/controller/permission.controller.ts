import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { PermissionService } from '../services/permission.service';

import { Permission } from '../entities/permission.entity';

import {
  GetOnePermission,
  GetAllPermissionDTO,
} from '../dto/get-permission.dto';
import { GroupedPermissionDTO } from '../schemas/permissions.schema';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all permissions',
    description: 'Returns a list of all permissions without their description.',
  })
  @ApiOkResponse({
    description: 'List of permissions retrieved successfully.',
    isArray: true,
    type: GetAllPermissionDTO,
  })
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }

  @Get('/grouped')
  @ApiOperation({
    summary: 'Get grouped permissions',
    description:
      'Returns a list of permission groups (parent permissions), each with its associated child permissions. Does not include descriptions.',
  })
  @ApiOkResponse({
    description: 'Grouped permissions retrieved successfully.',
    type: [GroupedPermissionDTO],
  })
  async findAllGrouped(): Promise<Permission[]> {
    return await this.permissionService.findAllGrouped();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one permission by id.',
    description: 'Returns a permission by id.',
  })
  @ApiOkResponse({
    description: 'Permission retrieved successfully.',
    type: GetOnePermission,
  })
  async findById(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findById(id);
  }
}
