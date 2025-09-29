import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeNotesNullable1759162200045 implements MigrationInterface {
  name = 'MakeNotesNullable1759162200045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "notes" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "notes" SET NOT NULL`,
    );
  }
}
