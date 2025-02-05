import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1738776227348 implements MigrationInterface {
  name = 'Init1738776227348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "type_person" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bf81c93a1f1c3cad74789c3679f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("id" SERIAL NOT NULL, "first_name" character varying(100) NOT NULL, "middle_name" character varying(100) NOT NULL, "last_name" character varying(255) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "typePersonId" integer, CONSTRAINT "REL_2a7cf0f884ea226af025dbb4e8" UNIQUE ("typePersonId"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "personId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6aac19005cea8e2119cbe7759e8" UNIQUE ("personId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_2a7cf0f884ea226af025dbb4e8b" FOREIGN KEY ("typePersonId") REFERENCES "type_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_2a7cf0f884ea226af025dbb4e8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6aac19005cea8e2119cbe7759e8"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "personId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "last_name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "type_person"`);
  }
}
