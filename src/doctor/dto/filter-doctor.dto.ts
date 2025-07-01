import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

import { PaginationDto } from '@/common/dto/pagination.dto';
import { Type } from 'class-transformer';

export class FilterDoctorDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search keyword to filter doctors by name or email.',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'ID of the specialty to filter doctors by.',
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  specialtyId?: number;
}
