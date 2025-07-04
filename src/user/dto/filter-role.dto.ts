import { PaginationDto } from '@/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterRoleDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search keyword to filter roles by name.',
    example: 'Odontologo',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
