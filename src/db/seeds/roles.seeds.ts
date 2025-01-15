import { EntityManager } from 'typeorm';

import { roleSeeds } from './seeds';
import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';

class RoleSeeds {
  constructor(private readonly entityManager: EntityManager) {}

  async createRolesSeeds(permissions: Permission[]): Promise<Role[]> {
    if (!Array.isArray(permissions)) {
      await this.entityManager.connection.destroy();
      return [];
    }

    const roles: Role[] = [];

    const repository = this.entityManager.getRepository(Role);
    const pivotRepository = this.entityManager.getRepository(RolePermission);

    if (roleSeeds.length > 0) {
      for (const role of roleSeeds) {
        const create = repository.create({
          name: role.name,
          description: role.description,
        });

        const saved = await repository.save(create);
        roles.push(saved);
      }

      if (permissions.length > 0) {
        for (const [i, permission] of permissions.entries()) {
          const create = pivotRepository.create({
            permission: permission,
            role: roles[i] === undefined ? roles[0] : roles[i],
          });

          await pivotRepository.save(create);
        }
      }
    }

    return roles;
  }
}

export default RoleSeeds;
