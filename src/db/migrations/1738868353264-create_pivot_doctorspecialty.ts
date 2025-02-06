import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePivotDoctorspecialty1738868353264 implements MigrationInterface {
    name = 'CreatePivotDoctorspecialty1738868353264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "FK_bb2b1ec7556ecdf92c8b6cc8cf7"`);
        await queryRunner.query(`CREATE TABLE "doctor_specialty" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "doctor_id" integer, "specialty_id" integer, CONSTRAINT "PK_bb2b1ec7556ecdf92c8b6cc8cf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "REL_bb2b1ec7556ecdf92c8b6cc8cf"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "specialty_id"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialty" ADD CONSTRAINT "FK_f094b41552f4096abd621b72896" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_specialty" ADD CONSTRAINT "FK_7792fabe9bfec740f0ec9027347" FOREIGN KEY ("specialty_id") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_specialty" DROP CONSTRAINT "FK_7792fabe9bfec740f0ec9027347"`);
        await queryRunner.query(`ALTER TABLE "doctor_specialty" DROP CONSTRAINT "FK_f094b41552f4096abd621b72896"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD "specialty_id" integer`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "REL_bb2b1ec7556ecdf92c8b6cc8cf" UNIQUE ("specialty_id")`);
        await queryRunner.query(`DROP TABLE "doctor_specialty"`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "FK_bb2b1ec7556ecdf92c8b6cc8cf7" FOREIGN KEY ("specialty_id") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
