import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response as ResponseExpress } from 'express';

import { AppointmentService } from '../services/appointment.service';

import { CreateInstantAppointmentDto } from '../dto/create-instant-appointment.dto';
import { FilterAppointmentDto } from '../dto/filter-appointment.dto';

import { AppointmentsList } from '../schemas/appointment-list.schema';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('instant')
  @ApiOperation({ summary: 'Crear cita instantánea con odontograma' })
  @ApiResponse({ status: 201, description: 'Cita creada correctamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  async createInstantAppointment(
    @Body() createInstantAppointmentDto: CreateInstantAppointmentDto,
  ): Promise<void> {
    return this.appointmentService.handleInstantAppointment(
      createInstantAppointmentDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of appointments',
    description:
      'Retrieve a paginated list of appointments, with optional filters by patient name, date range, and status.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of filtered appointments retrieved successfully.',
    type: AppointmentsList,
    isArray: true,
  })
  async findAll(
    @Query() filterAppointmentDto: FilterAppointmentDto,
    @Response() res: ResponseExpress,
  ): Promise<ResponseExpress<void>> {
    const response = await this.appointmentService.getAllAppointment(
      filterAppointmentDto,
      res,
    );
    return res.json(response);
  }

  /* @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto): string {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): string {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.appointmentService.remove(id);
  } */
}
