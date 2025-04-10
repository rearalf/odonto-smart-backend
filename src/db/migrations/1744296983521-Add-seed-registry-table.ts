import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSeedRegistryTable1744296983521 implements MigrationInterface {
  name = 'AddSeedRegistryTable1744296983521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "seed_registry" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "seed_name" character varying NOT NULL, "executed_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7fa272169330fa8fed725524cbd" UNIQUE ("seed_name"), CONSTRAINT "PK_512abd743f4e8c97a37f81975b1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seed_registry"`);
  }
}
