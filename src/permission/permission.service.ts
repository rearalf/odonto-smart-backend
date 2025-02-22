import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Inject,
  forwardRef,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly dataSource: DataSource,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getPermissionsByUserId(id: number) {
    return await this.dataSource.transaction(async () => {
      const user = await this.userService.findUserById(id);

      const permissionsNames = user.permission.map(
        (permission) => permission.name,
      );

      return permissionsNames;
    });
  }

  async getPermissionsByRoleId(id: number) {
    return await this.dataSource.transaction(async () => {
      const role = await this.roleService.findRoleById(id);

      const permissionsNames = role.permission.map(
        (permissions) => permissions.permission.name,
      );

      return permissionsNames;
    });
  }

  async findById(id: number) {
    const permission = await this.permissionRepository
      .createQueryBuilder('permission')
      .where('permission.id = :id', { id })
      .getOne();

    if (!permission) throw new NotFoundException('Permiso no encontrado.');

    return permission;
  }

  async findMultiUserPermission(ids: number[]) {
    const permissions = await this.permissionRepository
      .createQueryBuilder('permission')
      .select(['permission.id', 'permission.name', 'permission.description'])
      .where('permission.id IN (:...permissions)', { permissions: ids })
      .getMany();

    return permissions;
  }
}
