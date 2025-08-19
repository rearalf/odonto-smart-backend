import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { PatientService } from '../services/patient.service';

import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiOperation({
    summary: 'Create a patient',
    description: 'Returns a new patient.',
  })
  @ApiOkResponse({
    description: 'The patient has been created.',
  })
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientService.create(createPatientDto);
  }

  @Get()
  findAll(): string {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ): string {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.patientService.remove(id);
  }
}
