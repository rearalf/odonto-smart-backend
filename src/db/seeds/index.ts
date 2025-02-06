import { DataSource } from 'typeorm';

import { databaseConnection } from 'src/config/typeorm';

import PermissionSeeds from './permission.seeds';
import RoleSeeds from './roles.seeds';
import UserSeeds from './user.seeds';
import PersonSeeds from './person.seeds';
import SpecialtySeeds from './specialty.seeds';

class Seeds {
  constructor(private readonly dataSource: DataSource) {}

  async init() {
    await this.dataSource.initialize();

    await this.dataSource.transaction(async (manager) => {
      const specialtySeeds = new SpecialtySeeds(manager);
      await specialtySeeds.createSpecialtySeeds();

      const permissionSeeds = new PermissionSeeds(manager);
      const permissions = await permissionSeeds.createPermissionsSeeds();

      if (permissions.length <= 0) {
        await manager.connection.destroy();
      }

      const roleSeeds = new RoleSeeds(manager);
      const roles = await roleSeeds.createRolesSeeds(permissions);

      const personSeed = new PersonSeeds(manager);
      const person = await personSeed.createPerson();

      const userSeeds = new UserSeeds(manager);
      await userSeeds.createUsersSeeds(person, roles);
    });
    await this.dataSource.destroy();
  }
}

const seeds = new Seeds(databaseConnection);

seeds.init();
