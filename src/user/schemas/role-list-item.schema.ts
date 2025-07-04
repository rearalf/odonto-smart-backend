import { ApiProperty } from '@nestjs/swagger';

class PermissionSchema {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Periodontics' })
  name: string;

  @ApiProperty({ example: 'Gum disease treatment' })
  description: string;

  @ApiProperty({ example: 'Gum disease treatment' })
  label: string;
}

export class RoleListItemSchema {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the role.',
  })
  id: number;

  @ApiProperty({
    example: 'Odontologo',
    description:
      'Name of the role. This should be a short and descriptive label.',
  })
  name: string;

  @ApiProperty({
    example: 'This role has full control',
    description:
      'Optional description providing additional details about the role.',
    required: false,
  })
  description: string;

  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'CREATE_USER',
        label: 'Crear usuario',
        description: 'This permission allows you to create users',
      },
    ],
    description:
      'Optional description providing additional details about the role.',
    required: false,
  })
  permissions: PermissionSchema[];
}
