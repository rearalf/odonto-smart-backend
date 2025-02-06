import { PersonType } from 'src/person-type/entities/person-type.entity';
import { Person } from 'src/person/entities/person.entity';
import { EntityManager } from 'typeorm';
import { personTypeSeeds } from './seeds';

class PersonSeeds {
  constructor(private readonly entityManager: EntityManager) {}

  async createPerson(): Promise<Person> {
    const personTypeRepository = this.entityManager.getRepository(PersonType);
    const repository = this.entityManager.getRepository(Person);

    const personsTypeSaved: PersonType[] = [];

    for (const personType of personTypeSeeds) {
      const create = personTypeRepository.create({ ...personType });
      const saved = await personTypeRepository.save(create);
      personsTypeSaved.push(saved);
    }

    const create = repository.create({
      first_name: 'Administrador',
      last_name: 'Administrador',
      personType: personsTypeSaved[0],
    });

    const saved = await repository.save(create);

    return saved;
  }
}

export default PersonSeeds;
