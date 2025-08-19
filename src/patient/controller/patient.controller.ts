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

import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PatientService } from '../patient.service';

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
  create(@Body() createPatientDto: CreatePatientDto): string {
    return this.patientService.create(createPatientDto);
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
