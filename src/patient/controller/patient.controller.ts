import { ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response as ResponseExpress } from 'express';
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Response,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { PatientService } from '../services/patient.service';

import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { FilterPatientDto } from '../dto/filter-patient.dto';

import { Patient } from '../entities/patient.entity';

import { PatientListItemSchema } from '../schemas/patients.schemas';

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
  @ApiOperation({
    summary: 'Retrieve a list of patients',
    description:
      'Returns a list of patients with basic information, including their contact details.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the list of patients.',
    isArray: true,
    type: PatientListItemSchema,
  })
  async findAll(
    @Query() filterPatientDto: FilterPatientDto,
    @Response() res: ResponseExpress,
  ): Promise<
    ResponseExpress<
      {
        id: number;
        fullName: string;
        phone: string;
        birth_date: Date;
        age: number;
      }[]
    >
  > {
    const response = await this.patientService.findAll(filterPatientDto, res);
    return res.json(response);
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
