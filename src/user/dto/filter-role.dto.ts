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

export class RoleWithPermissionsDto {
  id: number;
  name: string;
  description: string;
  permission: number[];
  permissionsGroup: {
    id: number;
    name: string;
    label: string;
    description: string;
    children: {
      id: number;
      name: string;
      label: string;
      description: string;
    }[];
  }[];
}
