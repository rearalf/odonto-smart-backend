import { DataSource } from 'typeorm';

import { databaseConnection } from 'src/config/typeorm';

import PermissionSeeds from './permission.seeds';
import RoleSeeds from './roles.seeds';
import UserSeeds from './user.seeds';

class Seeds {
  constructor(private readonly dataSource: DataSource) {}

  async init() {
    await this.dataSource.initialize();

    await this.dataSource.transaction(async (manager) => {
      const permissionSeeds = new PermissionSeeds(manager);
      const permissions = await permissionSeeds.createPermissionsSeeds();

      if (permissions.length <= 0) {
        await manager.connection.destroy();
      }

      const roleSeeds = new RoleSeeds(manager);
      const roles = await roleSeeds.createRolesSeeds(permissions);

      const userSeeds = new UserSeeds(manager);
      await userSeeds.createUsersSeeds(roles);
    });
    await this.dataSource.destroy();
  }
}

const seeds = new Seeds(databaseConnection);

seeds.init();
