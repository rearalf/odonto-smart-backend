import { Controller, Get, Param } from '@nestjs/common';

import { OdontogramService } from '../services/odontogram.service';
import { Odontogram } from '../entities/odontogram.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

// import { CreateOdontogramDto } from '../dto/create-odontogram.dto';
// import { UpdateOdontogramDto } from '../dto/update-odontogram.dto';

@ApiTags('Odontogram')
@Controller('odontogram')
export class OdontogramController {
  constructor(private readonly odontogramService: OdontogramService) {}

  @Get('general/:patientId')
  @ApiOperation({ summary: 'Get general odontogram by patient ID' })
  @ApiParam({
    name: 'patientId',
    type: Number,
    description: 'ID of the patient whose general odontogram is requested',
  })
  @ApiResponse({
    status: 200,
    description: 'The general odontogram for the patient',
    // type: Odontogram,
  })
  @ApiResponse({ status: 404, description: 'Odontogram not found' })
  async getGeneralOdontogram(
    @Param('patientId') patientId: number,
  ): Promise<Odontogram> {
    return await this.odontogramService.findOdontogram('patient', patientId);
  }

  @Get('appointment/:appointmentId')
  @ApiOperation({ summary: 'Get odontogram by appointment ID' })
  @ApiParam({
    name: 'appointmentId',
    type: Number,
    description: 'ID of the appointment whose odontogram is requested',
  })
  @ApiResponse({
    status: 200,
    description: 'The odontogram for the appointment',
    // type: Odontogram,
  })
  @ApiResponse({ status: 404, description: 'Odontogram not found' })
  async getAppointmentOdontogram(
    @Param('appointmentId') appointmentId: number,
  ): Promise<Odontogram> {
    return await this.odontogramService.findOdontogram(
      'appointment',
      appointmentId,
    );
  }

  // @Post()
  // create(@Body() createOdontogramDto: CreateOdontogramDto): string {
  //   return this.odontogramService.create(createOdontogramDto);
  // }

  // @Get()
  // findAll(): string {
  //   return this.odontogramService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): string {
  //   return this.odontogramService.findOne(id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateOdontogramDto: UpdateOdontogramDto,
  // ): string {
  //   return this.odontogramService.update(id, updateOdontogramDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number): string {
  //   return this.odontogramService.remove(id);
  // }
}
