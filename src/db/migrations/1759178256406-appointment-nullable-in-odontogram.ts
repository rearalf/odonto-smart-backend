import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentNullableInOdontogram1759178256406
  implements MigrationInterface
{
  name = 'AppointmentNullableInOdontogram1759178256406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "appointment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "appointment_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
