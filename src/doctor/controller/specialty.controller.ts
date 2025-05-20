import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { SpecialtyService } from '../services/specialty.service';
import { Specialty } from '../entities/specialty.entity';
import { BasicDto } from '@/common/dto/basic.dto';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all possible specialties',
    description: 'Returns an array of the specialty entity.',
  })
  @ApiOkResponse({
    description: 'Returns an array of the specialty entity.',
    type: BasicDto,
    isArray: true,
  })
  async findAll(): Promise<Specialty[]> {
    return await this.specialtyService.getAllSpecialties();
  }
}
