import { EntityManager } from 'typeorm';

import { permissionSeeds } from './seeds';
import { Permission } from 'src/permission/entities/permission.entity';

class PermissionSeeds {
  constructor(private readonly entityManager: EntityManager) {}

  async createPermissionsSeeds(): Promise<Permission[]> {
    const repository = this.entityManager.getRepository(Permission);
    const permissions: Permission[] = [];

    if (permissionSeeds.length > 0) {
      for (const permission of permissionSeeds) {
        const create = repository.create({ ...permission });
        const saved: Permission = await repository.save(create);
        permissions.push(saved);
      }
    }

    return permissions;
  }
}

export default PermissionSeeds;
