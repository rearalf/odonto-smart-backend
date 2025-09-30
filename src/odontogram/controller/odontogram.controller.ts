import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

import { OdontogramService } from '../services/odontogram.service';
import { OdontogramSchema } from '../schemas/odontrogram.schema';

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
    type: OdontogramSchema,
  })
  @ApiResponse({ status: 404, description: 'Odontogram not found' })
  async getGeneralOdontogram(
    @Param('patientId') patientId: number,
  ): Promise<OdontogramSchema> {
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
    type: OdontogramSchema,
  })
  @ApiResponse({ status: 404, description: 'Odontogram not found' })
  async getAppointmentOdontogram(
    @Param('appointmentId') appointmentId: number,
  ): Promise<OdontogramSchema> {
    return await this.odontogramService.findOdontogram(
      'appointment',
      appointmentId,
    );
  }
}
