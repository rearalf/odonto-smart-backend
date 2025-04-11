import { DataSource, EntityManager } from 'typeorm';

import { Permission } from '@/user/entities/permission.entity';
import { permissionSeeds } from './seeder-values';
import { Seeder } from './seeder';

export class PermissionSeed extends Seeder {
  constructor(readonly dataSource: DataSource) {
    super(dataSource);
  }

  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([...permissionSeeds])
      .execute();
  }
}
