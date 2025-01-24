import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  async getPermissionsByUserId(id: number) {
    return await this.dataSource.transaction(async () => {
      const user = await this.userService.findUserById(id);

      const permissionsNames = user.permission.map(
        (permission) => permission.permission.name,
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
}
