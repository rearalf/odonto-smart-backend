import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BasicDto, IdNameDto } from '@/common/dto/basic.dto';
import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';

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
    type: IdNameDto,
  })
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
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
}
