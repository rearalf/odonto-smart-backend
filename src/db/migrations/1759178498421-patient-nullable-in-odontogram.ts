import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientNullableInOdontogram1759178498421
  implements MigrationInterface
{
  name = 'PatientNullableInOdontogram1759178498421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_601024a077d01fc4937158460b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "patient_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_601024a077d01fc4937158460b3" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_601024a077d01fc4937158460b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "patient_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_601024a077d01fc4937158460b3" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
