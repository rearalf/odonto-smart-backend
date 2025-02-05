import { PERMISSIONS_ENUM, TABLES_ENUM } from 'src/config/permissions.config';

export const roleSeeds: IRolesSeeds[] = [
  {
    name: 'GOD',
    description: 'Tiene todos los permisos',
  },
];

export enum ContactTypeEnum {
  CEL = 'cel',
  TEL = 'tel',
  EMAIL = 'email',
}

export enum GenderEnum {
  MAN = 'man',
  WOMAN = 'women',
}

export const permissionSeeds: IPermissionSeeds[] = [
  {
    name: PERMISSIONS_ENUM.CREATE + TABLES_ENUM.USER,
    description: 'Puede crear ususarios',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.USER,
    description: 'Puede consultar perfiles de ususario',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.USER + 's',
    description: 'Puede consultar todos los ususarios',
  },
  {
    name: PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.USER,
    description: 'Puede actulizar usuarios',
  },
  {
    name: PERMISSIONS_ENUM.DELETE + TABLES_ENUM.USER,
    description: 'Puede eliminar usuarios',
  },
  {
    name: PERMISSIONS_ENUM.CREATE + TABLES_ENUM.ROLE,
    description: 'Puede crear roles',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.ROLE,
    description: 'Puede consultar perfiles de rol',
  },
  {
    name: PERMISSIONS_ENUM.VIEW + TABLES_ENUM.ROLE + 's',
    description: 'Puede consultar todos los roles',
  },
  {
    name: PERMISSIONS_ENUM.UPDATE + TABLES_ENUM.ROLE,
    description: 'Puede actulizar roles',
  },
  {
    name: PERMISSIONS_ENUM.DELETE + TABLES_ENUM.ROLE,
    description: 'Puede eliminar roles',
  },
];
