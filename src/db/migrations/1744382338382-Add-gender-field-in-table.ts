import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGenderFieldInTable1744382338382 implements MigrationInterface {
  name = 'AddGenderFieldInTable1744382338382';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."patient_gender_enum" AS ENUM('male', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD "gender" "public"."patient_gender_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."patient_gender_enum"`);
  }
}
