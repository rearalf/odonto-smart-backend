import { ApiProperty } from '@nestjs/swagger';

export class PermissionChildDTO {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'CREATE_DOCTOR' })
  name: string;

  @ApiProperty({ example: 'Crear doctores' })
  label: string;
}

export class GroupedPermissionDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'GROUP_DOCTOR' })
  name: string;

  @ApiProperty({ example: 'Permisos de doctores' })
  label: string;

  @ApiProperty({ type: [PermissionChildDTO] })
  children: PermissionChildDTO[];
}
