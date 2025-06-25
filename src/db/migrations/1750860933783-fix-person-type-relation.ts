import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixPersonTypeRelation1750860933783 implements MigrationInterface {
  name = 'FixPersonTypeRelation1750860933783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_5157fa65538cae06e66c922c898"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_1711d76c14c9146c23087558bb3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "REL_1711d76c14c9146c23087558bb"`,
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
      `ALTER TABLE "person" ADD CONSTRAINT "REL_1711d76c14c9146c23087558bb" UNIQUE ("person_type_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_1711d76c14c9146c23087558bb3" FOREIGN KEY ("person_type_id") REFERENCES "person_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_5157fa65538cae06e66c922c898" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
