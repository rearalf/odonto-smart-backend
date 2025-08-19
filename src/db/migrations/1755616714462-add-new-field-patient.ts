import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewFieldPatient1755616714462 implements MigrationInterface {
  name = 'AddNewFieldPatient1755616714462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" DROP COLUMN "current_systematic_treatment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP COLUMN "lab_references"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "current_systemic_treatment" text`,
    );
    await queryRunner.query(`ALTER TABLE "patient" ADD "lab_results" text`);
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "address" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "occupation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "snc" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "svc" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "se" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "sme" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "systemNotes1" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "sr" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "su" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "sgu" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "sgi" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "systemNotes2" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "systemNotes2"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "sgi"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "sgu"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "su"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "sr"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "systemNotes1"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "sme"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "se"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "svc"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "snc"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "occupation"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "lab_results"`);
    await queryRunner.query(
      `ALTER TABLE "patient" DROP COLUMN "current_systemic_treatment"`,
    );
    await queryRunner.query(`ALTER TABLE "patient" ADD "lab_references" text`);
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "current_systematic_treatment" text`,
    );
  }
}
