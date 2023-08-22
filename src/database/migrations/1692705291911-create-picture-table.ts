import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPictureTable1692705291911 implements MigrationInterface {
  name = 'createPictureTable1692705291911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "picture" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT NOW(), "updated_at" TIMESTAMP DEFAULT NOW(), "deleted_at" TIMESTAMP, "key" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "color_number" integer NOT NULL, "size" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "link" character varying NOT NULL, "file_path" character varying NOT NULL, "file_name" character varying NOT NULL, "file_size" integer NOT NULL, "file_type" character varying NOT NULL, "shoppe_code" character varying, CONSTRAINT "PK_31ccf37c74bae202e771c0c2a38" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "picture"`);
  }
}
