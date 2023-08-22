import { MigrationInterface, QueryRunner } from "typeorm";

export class alterFilesAlterExpiresTable1691333047747 implements MigrationInterface {
    name = 'alterFilesAlterExpiresTable1691333047747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "expires" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "maxDownloads" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "maxDownloads" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "expires" SET NOT NULL`);
    }

}
