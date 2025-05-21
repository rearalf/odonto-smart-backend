import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { DoctorService } from '../services/doctor.service';

import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { IDoctorResponse } from '@/common/dto/doctor.dto';

import { Doctor } from '../entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a doctor',
    description: 'Returns a new doctor.',
  })
  @ApiOkResponse({
    description: 'The doctor has been created.',
  })
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the doctors',
    description: 'Returns a list of doctor.',
  })
  @ApiOkResponse({
    description: 'The list with the minimum data of the doctors.',
  })
  findAll(): string {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get only one doctor',
    description:
      'Returns all the information about a doctor by id, except user information.',
  })
  @ApiOkResponse({
    description:
      'Get all the information about a doctor by id, except user information.',
  })
  async findOne(@Param('id') id: number): Promise<IDoctorResponse> {
    return await this.doctorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a doctor',
    description: 'Returns the minimum data about the updated doctor by id.',
  })
  @ApiOkResponse({
    description: 'Returns the minimum data about the updated doctor by id.',
  })
  update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): string {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Soft removed of a doctor',
    description: 'Soft delete of a doctor by id, this operation is permanent.',
  })
  @ApiOkResponse({
    description: 'Returns the string.',
  })
  remove(@Param('id') id: number): string {
    return this.doctorService.remove(id);
  }
}
