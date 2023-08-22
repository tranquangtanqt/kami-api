import { MigrationInterface, QueryRunner } from "typeorm";

export class createFileTable1690702653510 implements MigrationInterface {
    name = 'createFileTable1690702653510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT NOW(), "updated_at" TIMESTAMP DEFAULT NOW(), "deleted_at" TIMESTAMP, "key" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "expiry" character varying NOT NULL, "downloads" integer NOT NULL, "maxDownloads" integer NOT NULL, "autoDelete" boolean NOT NULL DEFAULT false, "size" integer NOT NULL, "mimeType" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
