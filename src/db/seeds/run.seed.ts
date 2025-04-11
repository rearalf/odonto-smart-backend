import { connectionSource } from '@/config/typeorm';
import { ConfigService } from '@nestjs/config';
import { PersonTypeSeed } from './person-type.seed';
import { SpecialtySeed } from './specialty.seed';
import { PermissionSeed } from './permission.seed';
import { RoleSeed } from './role.seed';
import { RolePermissionSeed } from './rolePermission.seed';

async function runSeeders(): Promise<void> {
  const dataSource = await connectionSource.initialize();
  const _configService = new ConfigService();

  const personType = new PersonTypeSeed(dataSource);
  const specialties = new SpecialtySeed(dataSource);
  const permission = new PermissionSeed(dataSource);
  const role = new RoleSeed(dataSource);
  const rolePermission = new RolePermissionSeed(dataSource);

  try {
    await personType.execute();
    await specialties.execute();
    await permission.execute();
    await role.execute();
    await rolePermission.execute();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in seeder execution: ', error);
  } finally {
    await dataSource.destroy();
  }
}

// eslint-disable-next-line no-console
runSeeders().catch((error) => console.log(error));
