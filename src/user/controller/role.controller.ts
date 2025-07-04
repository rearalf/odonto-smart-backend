import { Response as ResponseExpress } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
  Response,
  Controller,
} from '@nestjs/common';

import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';

import { BasicDto } from '@/common/dto/basic.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { FilterRoleDto } from '../dto/filter-role.dto';
import { RoleListItemSchema } from '../schemas/role-list-item.schema';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all rolse',
    description: 'Returns a list of all roles without their description.',
  })
  @ApiOkResponse({
    description: 'List of roles retrieved successfully.',
    isArray: true,
    type: RoleListItemSchema,
  })
  async findAll(
    @Query() filterRoleDto: FilterRoleDto,
    @Response() res: ResponseExpress,
  ): Promise<ResponseExpress<RoleListItemSchema[]>> {
    const response = await this.roleService.findAll(filterRoleDto, res);
    return res.json(response);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one role by id.',
    description: 'Returns a person type by id.',
  })
  @ApiOkResponse({
    description: 'Role retrieved successfully.',
    type: BasicDto,
  })
  async findById(@Param('id') id: number): Promise<Role> {
    return this.roleService.findById(id);
  }

  @Post('create-role')
  @ApiOperation({
    summary: 'Create a new role.',
    description: 'Returns a new role.',
  })
  @ApiCreatedResponse({
    description: 'The role has been created.',
    type: CreateRoleDto,
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a role.',
    description: 'Returns a new role.',
  })
  @ApiCreatedResponse({
    description: 'The role has been deleted.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'Role fue eliminado correctamente.',
        },
        deletedPermissions: { type: 'number', example: 5 },
      },
    },
  })
  async delete(@Param('id') id: number): Promise<{
    success: boolean;
    message: string;
    deletedPermissions: number;
  }> {
    return this.roleService.delete(id);
  }
}
