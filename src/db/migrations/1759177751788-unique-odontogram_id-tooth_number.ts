import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueOdontogramIdToothNumber1759177751788
  implements MigrationInterface
{
  name = 'UniqueOdontogramIdToothNumber1759177751788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tooth" ADD CONSTRAINT "UQ_50fb17a2eb636b6cc52aeaadcde" UNIQUE ("odontogram_id", "tooth_number")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tooth" DROP CONSTRAINT "UQ_50fb17a2eb636b6cc52aeaadcde"`,
    );
  }
}
