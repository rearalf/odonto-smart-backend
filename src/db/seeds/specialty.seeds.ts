import { EntityManager } from 'typeorm';
import { specialtiesSeeds } from './seeds';
import { Specialty } from 'src/specialty/entities/specialty.entity';

class SpecialtySeeds {
  constructor(private readonly entityManager: EntityManager) {}

  async createSpecialtySeeds() {
    const repository = this.entityManager.getRepository(Specialty);
    const specialties: Specialty[] = [];

    for (const specialty of specialtiesSeeds) {
      const create = repository.create({ ...specialty });
      const saved = await repository.save(create);
      specialties.push(saved);
    }

    return specialties;
  }
}

export default SpecialtySeeds;
