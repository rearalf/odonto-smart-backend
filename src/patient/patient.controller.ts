import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
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
