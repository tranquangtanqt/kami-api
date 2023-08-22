import { MigrationInterface, QueryRunner } from "typeorm";

export class alterFilesAddPathFileTable1691331976151 implements MigrationInterface {
    name = 'alterFilesAddPathFileTable1691331976151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ADD "path_file" character varying`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "link" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "downloads" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "downloads" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "link" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "path_file"`);
    }

}
