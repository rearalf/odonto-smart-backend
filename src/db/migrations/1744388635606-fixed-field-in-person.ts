import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedFieldInPerson1744388635606 implements MigrationInterface {
  name = 'FixedFieldInPerson1744388635606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_e72bce5ab567fd42f899254345c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_83b775da14886d352de2a4cac01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "REL_83b775da14886d352de2a4cac0"`,
    );
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "REL_e72bce5ab567fd42f899254345"`,
    );
    await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "personTypeId"`);
    await queryRunner.query(
      `ALTER TABLE "person" ADD "profile_picture" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ALTER COLUMN "permission_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ALTER COLUMN "role_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "UQ_5157fa65538cae06e66c922c898" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "UQ_1711d76c14c9146c23087558bb3" UNIQUE ("person_type_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_5157fa65538cae06e66c922c898" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_1711d76c14c9146c23087558bb3" FOREIGN KEY ("person_type_id") REFERENCES "person_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_1711d76c14c9146c23087558bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_5157fa65538cae06e66c922c898"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "UQ_1711d76c14c9146c23087558bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "UQ_5157fa65538cae06e66c922c898"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ALTER COLUMN "role_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ALTER COLUMN "permission_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP COLUMN "profile_picture"`,
    );
    await queryRunner.query(`ALTER TABLE "person" ADD "personTypeId" integer`);
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "REL_e72bce5ab567fd42f899254345" UNIQUE ("personTypeId")`,
    );
    await queryRunner.query(`ALTER TABLE "person" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "REL_83b775da14886d352de2a4cac0" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_83b775da14886d352de2a4cac01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_e72bce5ab567fd42f899254345c" FOREIGN KEY ("personTypeId") REFERENCES "person_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
