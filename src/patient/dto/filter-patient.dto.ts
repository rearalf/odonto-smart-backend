import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterPatientDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search keyword to filter doctors by name or email.',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
