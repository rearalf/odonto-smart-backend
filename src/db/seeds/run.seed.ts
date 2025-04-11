import { connectionSource } from '@/config/typeorm';
import { ConfigService } from '@nestjs/config';
import { PersonTypeSeed } from './person-type.seed';
import { SpecialtySeed } from './specialty.seed';

async function runSeeders(): Promise<void> {
  const dataSource = await connectionSource.initialize();
  const _configService = new ConfigService();

  const personType = new PersonTypeSeed(dataSource);
  const specialties = new SpecialtySeed(dataSource);

  try {
    await personType.execute();
    await specialties.execute();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in seeder execution: ', error);
  } finally {
    await dataSource.destroy();
  }
}

// eslint-disable-next-line no-console
runSeeders().catch((error) => console.log(error));
