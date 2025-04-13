import { ConfigService } from '@nestjs/config';

import { connectionSource } from '@/config/typeorm';

import { RolePermissionSeed } from './rolePermission.seed';
import { PersonTypeSeed } from './person-type.seed';
import { PermissionSeed } from './permission.seed';
import { SpecialtySeed } from './specialty.seed';
import { RoleSeed } from './role.seed';
import { UserSeed } from './user.seed';
import { PersonSeed } from './person.seed';
import { UserRoleSeed } from './userRole.seed';

async function runSeeders(): Promise<void> {
  const dataSource = await connectionSource.initialize();
  const configService = new ConfigService();

  const personType = new PersonTypeSeed(dataSource);
  const specialties = new SpecialtySeed(dataSource);
  const permission = new PermissionSeed(dataSource);
  const role = new RoleSeed(dataSource);
  const rolePermission = new RolePermissionSeed(dataSource);
  const user = new UserSeed(dataSource, configService);
  const person = new PersonSeed(dataSource);
  const userRole = new UserRoleSeed(dataSource);

  try {
    await personType.execute();
    await specialties.execute();
    await permission.execute();
    await role.execute();
    await rolePermission.execute();
    await user.execute();
    await person.execute();
    await userRole.execute();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in seeder execution: ', error);
  } finally {
    await dataSource.destroy();
  }
}

// eslint-disable-next-line no-console
runSeeders().catch((error) => console.log(error));
