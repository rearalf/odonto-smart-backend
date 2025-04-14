import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { PermissionService } from '../services/permission.service';
import { Permission } from '../entities/permission.entity';
import { BasicDto, IdNameDto } from '@/common/dto/basic.dto';

@ApiTags('Permission')
@Controller('Permission')
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
    type: IdNameDto,
  })
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one permission by id.',
    description: 'Returns a permission by id.',
  })
  @ApiOkResponse({
    description: 'Permission retrieved successfully.',
    type: BasicDto,
  })
  async findById(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findById(id);
  }
}
