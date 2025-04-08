import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto): string {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll(): string {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ): string {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.doctorService.remove(id);
  }
}
