import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity()
export class SeedRegistry extends BaseEntity {
  @Column({ unique: true })
  seed_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  executed_at: Date;
}
