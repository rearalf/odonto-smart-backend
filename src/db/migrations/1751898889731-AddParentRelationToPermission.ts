import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddParentRelationToPermission1751898889731
  implements MigrationInterface
{
  name = 'AddParentRelationToPermission1751898889731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "parent_permission_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_561bebba0a2f12a237a569ad694" FOREIGN KEY ("parent_permission_id") REFERENCES "permission"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_561bebba0a2f12a237a569ad694"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP COLUMN "parent_permission_id"`,
    );
  }
}
