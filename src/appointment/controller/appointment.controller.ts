import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';

import { AppointmentService } from '../services/appointment.service';
import { CreateInstantAppointmentDto } from '../dto/create-instant-appointment.dto';

// import { CreateAppointmentDto } from './dto/create-appointment.dto';
// import { UpdateAppointmentDto } from './dto/update-appointment.dto';

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

  /* @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto): string {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll(): string {
    return this.appointmentService.findAll();
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
