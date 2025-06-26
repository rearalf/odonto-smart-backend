import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '@/common/dto/pagination.dto';

export class FilterDoctorDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search?: string;
}
