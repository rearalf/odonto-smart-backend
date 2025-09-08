import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyOdontogramLogic1757347445940 implements MigrationInterface {
  name = 'ModifyOdontogramLogic1757347445940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" DROP CONSTRAINT "FK_c36edf1507fc55a648474a13933"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" ALTER COLUMN "odontogram_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_601024a077d01fc4937158460b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "patient_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "appointment_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "patient_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_b829cf7046dfb9d4e510984e977"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ALTER COLUMN "person_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" ADD CONSTRAINT "FK_c36edf1507fc55a648474a13933" FOREIGN KEY ("odontogram_id") REFERENCES "odontogram"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_601024a077d01fc4937158460b3" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_b829cf7046dfb9d4e510984e977" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_b829cf7046dfb9d4e510984e977"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" DROP CONSTRAINT "FK_601024a077d01fc4937158460b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" DROP CONSTRAINT "FK_c36edf1507fc55a648474a13933"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ALTER COLUMN "person_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_b829cf7046dfb9d4e510984e977" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "patient_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "appointment_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ALTER COLUMN "patient_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_601024a077d01fc4937158460b3" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" ALTER COLUMN "odontogram_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" ADD CONSTRAINT "FK_c36edf1507fc55a648474a13933" FOREIGN KEY ("odontogram_id") REFERENCES "odontogram"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
