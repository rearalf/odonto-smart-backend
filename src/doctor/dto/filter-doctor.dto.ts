import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '@/common/dto/pagination.dto';

export class FilterDoctorDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search keyword to filter doctors by name or email.',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
