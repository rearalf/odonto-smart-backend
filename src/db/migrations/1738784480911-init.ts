import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1738784480911 implements MigrationInterface {
  name = 'Init1738784480911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_2a7cf0f884ea226af025dbb4e8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" RENAME COLUMN "typePersonId" TO "type_person_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "personId" TO "person_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_6aac19005cea8e2119cbe7759e8" TO "UQ_a4cee7e601d219733b064431fba"`,
    );
    await queryRunner.query(
      `CREATE TABLE "specialty" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9cf4ae334dc4a1ab1e08956460e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."person_contact_type_enum" AS ENUM('cel', 'tel', 'email')`,
    );
    await queryRunner.query(
      `CREATE TABLE "person_contact" ("id" SERIAL NOT NULL, "type" "public"."person_contact_type_enum" NOT NULL, "contact" character varying(100) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "person_id" integer, CONSTRAINT "REL_ed78b7b2d50539bbc6796c70b4" UNIQUE ("person_id"), CONSTRAINT "PK_1094fd036d694f9949ef1c19e39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."patient_gender_enum" AS ENUM('man', 'women')`,
    );
    await queryRunner.query(
      `CREATE TABLE "patient" ("id" SERIAL NOT NULL, "birthDate" date NOT NULL, "gender" "public"."patient_gender_enum" NOT NULL, "allergies" character varying(255), "medialHistory" character varying(255), "currentCondition" character varying(255), "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "person_id" integer, CONSTRAINT "REL_b829cf7046dfb9d4e510984e97" UNIQUE ("person_id"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "person_id" integer, "specialty_id" integer, CONSTRAINT "REL_fb38f3d7d38878d734a3fbb562" UNIQUE ("person_id"), CONSTRAINT "REL_bb2b1ec7556ecdf92c8b6cc8cf" UNIQUE ("specialty_id"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_b90194ac604deae301f8b24d599" FOREIGN KEY ("type_person_id") REFERENCES "type_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a4cee7e601d219733b064431fba" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person_contact" ADD CONSTRAINT "FK_ed78b7b2d50539bbc6796c70b4e" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_b829cf7046dfb9d4e510984e977" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_fb38f3d7d38878d734a3fbb562b" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_bb2b1ec7556ecdf92c8b6cc8cf7" FOREIGN KEY ("specialty_id") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_bb2b1ec7556ecdf92c8b6cc8cf7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_fb38f3d7d38878d734a3fbb562b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_b829cf7046dfb9d4e510984e977"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person_contact" DROP CONSTRAINT "FK_ed78b7b2d50539bbc6796c70b4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a4cee7e601d219733b064431fba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_b90194ac604deae301f8b24d599"`,
    );
    await queryRunner.query(`DROP TABLE "doctor"`);
    await queryRunner.query(`DROP TABLE "patient"`);
    await queryRunner.query(`DROP TYPE "public"."patient_gender_enum"`);
    await queryRunner.query(`DROP TABLE "person_contact"`);
    await queryRunner.query(`DROP TYPE "public"."person_contact_type_enum"`);
    await queryRunner.query(`DROP TABLE "specialty"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_a4cee7e601d219733b064431fba" TO "UQ_6aac19005cea8e2119cbe7759e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "person_id" TO "personId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" RENAME COLUMN "type_person_id" TO "typePersonId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_2a7cf0f884ea226af025dbb4e8b" FOREIGN KEY ("typePersonId") REFERENCES "type_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
