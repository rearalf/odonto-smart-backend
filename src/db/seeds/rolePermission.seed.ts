import { DataSource, EntityManager } from 'typeorm';
import { Seeder } from './seeder';
import { RolePermission } from '@/user/entities/role-permission.entity';
import { rolePermissionSeeds } from './seeder-values';

export class RolePermissionSeed extends Seeder {
  constructor(readonly dataSource: DataSource) {
    super(dataSource);
  }

  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(RolePermission)
      .values(rolePermissionSeeds)
      .execute();
  }
}
