import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PersonTypeService } from '../services/person-type.service';
import { BasicDto, IdNameDto } from '@/common/dto/basic.dto';
import { PersonType } from '../entities/person_type.entity';

@ApiTags('Person Types')
@Controller('person-type')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all person types',
    description:
      'Returns a list of all person types without their description.',
  })
  @ApiOkResponse({
    description: 'List of person types retrieved successfully.',
    isArray: true,
    type: IdNameDto,
  })
  async findAll(): Promise<PersonType[]> {
    return await this.personTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one person type by id.',
    description: 'Returns a person type by id.',
  })
  @ApiOkResponse({
    description: 'List of person types retrieved successfully.',
    type: BasicDto,
  })
  async findById(@Param('id') id: number): Promise<PersonType> {
    return this.personTypeService.findById(id);
  }
}
