import { PaginationDto } from '@/common/dto/pagination.dto';
import { STATUS_ENUM } from '@/common/enums/appointment.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterAppointmentDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search keyword to filter appoitments by patients name.',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description:
      'Start date for filtering appointments (inclusive). Format: YYYY-MM-DD',
    example: '2025-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description:
      'End date for filtering appointments (inclusive). Format: YYYY-MM-DD',
    example: '2025-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Status of the appointment.',
    enum: STATUS_ENUM,
    example: STATUS_ENUM.CONFIRMED,
  })
  @IsOptional()
  @IsEnum(STATUS_ENUM, {
    message: `Status must be one of: ${Object.values(STATUS_ENUM).join(', ')}`,
  })
  status?: STATUS_ENUM;
}
