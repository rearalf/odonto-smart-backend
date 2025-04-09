import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1744210001316 implements MigrationInterface {
  name = 'Init1744210001316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer, "role_id" integer, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "person_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_d2cd135d78b326e81258b81c66b" UNIQUE ("name"), CONSTRAINT "PK_f900a8c313411c7da8fcbba7975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "person_contact_contact_type_enum" AS ENUM('EMAIL', 'PHONE', 'WHATSAPP', 'TELEGRAM')`,
    );
    await queryRunner.query(
      `CREATE TABLE "person_contact" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "contact_value" character varying(255) NOT NULL, "contact_type" "person_contact_contact_type_enum" NOT NULL, "person_id" integer, CONSTRAINT "PK_1094fd036d694f9949ef1c19e39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "first_name" character varying(100) NOT NULL, "middle_name" character varying(100), "last_name" character varying(100) NOT NULL, "profile_picture_name" character varying(255), "user_id" integer NOT NULL, "person_type_id" integer NOT NULL, "userId" integer, "personTypeId" integer, CONSTRAINT "REL_83b775da14886d352de2a4cac0" UNIQUE ("userId"), CONSTRAINT "REL_e72bce5ab567fd42f899254345" UNIQUE ("personTypeId"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" integer, "permission_id" integer, CONSTRAINT "PK_a7326749e773c740a7104634a77" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role_id" integer, "permission_id" integer, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "patient" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "birth_date" date NOT NULL, "medical_history" text, "allergic_reactions" text, "current_systematic_treatment" text, "lab_references" text, "complete_odontogram" boolean NOT NULL DEFAULT false, "person_id" integer, CONSTRAINT "REL_b829cf7046dfb9d4e510984e97" UNIQUE ("person_id"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "tooth_general_state_enum" AS ENUM('healthy', 'decayed', 'extraction', 'extraction_done', 'missing', 'filling', 'crown', 'root_canal', 'implanted', 'bridge_abutment', 'bridge_pontic')`,
    );
    await queryRunner.query(
      `CREATE TYPE "tooth_palatina_enum" AS ENUM('healthy', 'decay', 'filling', 'crown', 'fracture', 'sealant', 'bridge', 'implant', 'abscess', 'wear', 'erosion', 'stain', 'chipped', 'sensitive')`,
    );
    await queryRunner.query(
      `CREATE TYPE "tooth_distal_enum" AS ENUM('healthy', 'decay', 'filling', 'crown', 'fracture', 'sealant', 'bridge', 'implant', 'abscess', 'wear', 'erosion', 'stain', 'chipped', 'sensitive')`,
    );
    await queryRunner.query(
      `CREATE TYPE "tooth_mesial_enum" AS ENUM('healthy', 'decay', 'filling', 'crown', 'fracture', 'sealant', 'bridge', 'implant', 'abscess', 'wear', 'erosion', 'stain', 'chipped', 'sensitive')`,
    );
    await queryRunner.query(
      `CREATE TYPE "tooth_vestibular_enum" AS ENUM('healthy', 'decay', 'filling', 'crown', 'fracture', 'sealant', 'bridge', 'implant', 'abscess', 'wear', 'erosion', 'stain', 'chipped', 'sensitive')`,
    );
    await queryRunner.query(
      `CREATE TYPE "tooth_oclusal_enum" AS ENUM('healthy', 'decay', 'filling', 'crown', 'fracture', 'sealant', 'bridge', 'implant', 'abscess', 'wear', 'erosion', 'stain', 'chipped', 'sensitive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tooth" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "tooth_number" integer NOT NULL, "general_state" "tooth_general_state_enum" NOT NULL DEFAULT 'healthy', "palatina" "tooth_palatina_enum" NOT NULL DEFAULT 'healthy', "distal" "tooth_distal_enum" NOT NULL DEFAULT 'healthy', "mesial" "tooth_mesial_enum" NOT NULL DEFAULT 'healthy', "vestibular" "tooth_vestibular_enum" NOT NULL DEFAULT 'healthy', "oclusal" "tooth_oclusal_enum" NOT NULL DEFAULT 'healthy', "odontogram_id" integer, CONSTRAINT "PK_0a71cafc77eae5d19645aff3d63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "odontogram" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "patient_id" integer, "appointment_id" integer, CONSTRAINT "REL_1dc3fad2a181acc45cbb806525" UNIQUE ("appointment_id"), CONSTRAINT "PK_f4f29beac970624b6682d761945" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "specialty" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_6caedcf8a5f84e3072c5a380a16" UNIQUE ("name"), CONSTRAINT "PK_9cf4ae334dc4a1ab1e08956460e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor_specialty" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "doctor_id" integer, "specialty_id" integer, CONSTRAINT "PK_bb2b1ec7556ecdf92c8b6cc8cf7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "qualification" text NOT NULL, "person_id" integer, "specialty_id" integer, CONSTRAINT "REL_fb38f3d7d38878d734a3fbb562" UNIQUE ("person_id"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "appointment_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "appointment_date" TIMESTAMP NOT NULL, "reason" character varying(255) NOT NULL, "status" "appointment_status_enum" NOT NULL DEFAULT 'PENDING', "notes" text NOT NULL, "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP NOT NULL, "modified_at" TIMESTAMP, "modification_reason" text, "doctor_id" integer, "patient_id" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medical_record" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "description" text NOT NULL, "patient_id" integer, "appointment_id" integer, CONSTRAINT "PK_d96ede886356ac47ddcbb0bf3a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "medical_image" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "image_url" character varying NOT NULL, "original_filename" character varying NOT NULL, "medical_record_id" integer, CONSTRAINT "PK_940823a2d4743c2b0d26cf38045" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person_contact" ADD CONSTRAINT "FK_ed78b7b2d50539bbc6796c70b4e" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_83b775da14886d352de2a4cac01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_e72bce5ab567fd42f899254345c" FOREIGN KEY ("personTypeId") REFERENCES "person_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_8a4d5521c1ced158c13438df3df" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_b829cf7046dfb9d4e510984e977" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tooth" ADD CONSTRAINT "FK_c36edf1507fc55a648474a13933" FOREIGN KEY ("odontogram_id") REFERENCES "odontogram"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_601024a077d01fc4937158460b3" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "odontogram" ADD CONSTRAINT "FK_1dc3fad2a181acc45cbb806525d" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_specialty" ADD CONSTRAINT "FK_f094b41552f4096abd621b72896" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_specialty" ADD CONSTRAINT "FK_7792fabe9bfec740f0ec9027347" FOREIGN KEY ("specialty_id") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_fb38f3d7d38878d734a3fbb562b" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" ADD CONSTRAINT "FK_bb2b1ec7556ecdf92c8b6cc8cf7" FOREIGN KEY ("specialty_id") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record" ADD CONSTRAINT "FK_dddd1dc79ff4c20ae61b62f9add" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record" ADD CONSTRAINT "FK_ccb96f635a6644f79d07b2d8b2e" FOREIGN KEY ("appointment_id") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_image" ADD CONSTRAINT "FK_85aca332040d4ebc055cc773362" FOREIGN KEY ("medical_record_id") REFERENCES "medical_record"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medical_image" DROP CONSTRAINT "FK_85aca332040d4ebc055cc773362"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record" DROP CONSTRAINT "FK_ccb96f635a6644f79d07b2d8b2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "medical_record" DROP CONSTRAINT "FK_dddd1dc79ff4c20ae61b62f9add"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_bb2b1ec7556ecdf92c8b6cc8cf7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor" DROP CONSTRAINT "FK_fb38f3d7d38878d734a3fbb562b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_specialty" DROP CONSTRAINT "FK_7792fabe9bfec740f0ec9027347"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_specialty" DROP CONSTRAINT "FK_f094b41552f4096abd621b72896"`,
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
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_b829cf7046dfb9d4e510984e977"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" DROP CONSTRAINT "FK_8a4d5521c1ced158c13438df3df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" DROP CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_e72bce5ab567fd42f899254345c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_83b775da14886d352de2a4cac01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "person_contact" DROP CONSTRAINT "FK_ed78b7b2d50539bbc6796c70b4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(`DROP TABLE "medical_image"`);
    await queryRunner.query(`DROP TABLE "medical_record"`);
    await queryRunner.query(`DROP TABLE "appointment"`);
    await queryRunner.query(`DROP TYPE "appointment_status_enum"`);
    await queryRunner.query(`DROP TABLE "doctor"`);
    await queryRunner.query(`DROP TABLE "doctor_specialty"`);
    await queryRunner.query(`DROP TABLE "specialty"`);
    await queryRunner.query(`DROP TABLE "odontogram"`);
    await queryRunner.query(`DROP TABLE "tooth"`);
    await queryRunner.query(`DROP TYPE "tooth_oclusal_enum"`);
    await queryRunner.query(`DROP TYPE "tooth_vestibular_enum"`);
    await queryRunner.query(`DROP TYPE "tooth_mesial_enum"`);
    await queryRunner.query(`DROP TYPE "tooth_distal_enum"`);
    await queryRunner.query(`DROP TYPE "tooth_palatina_enum"`);
    await queryRunner.query(`DROP TYPE "tooth_general_state_enum"`);
    await queryRunner.query(`DROP TABLE "patient"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "user_permission"`);
    await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "person_contact"`);
    await queryRunner.query(`DROP TYPE "person_contact_contact_type_enum"`);
    await queryRunner.query(`DROP TABLE "person_type"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
  }
}
