import { Specialty } from '@/doctor/entities/specialty.entity';
import { Seeder } from './seeder';
import { DataSource, EntityManager } from 'typeorm';
import { specialtiesSeeds } from './seeder-values';

export class SpecialtySeed extends Seeder {
  constructor(readonly dataSource: DataSource) {
    super(dataSource);
  }

  async run(manager: EntityManager): Promise<void> {
    await manager
      .createQueryBuilder()
      .insert()
      .into(Specialty)
      .values([...specialtiesSeeds])
      .execute();
  }
}
