import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668803988779 implements MigrationInterface {
    name = 'default1668803988779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_d96c592e21b5e8c2b85bdc0ab95"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_8c7703f23cb340a11cc96caeb99"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "debitedAccountIdId"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP COLUMN "creditedAccountIdId"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_e69e33852efd0d31f6b9476f329" FOREIGN KEY ("debitedAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_4f8b61b183f49d152f920cd4ca9" FOREIGN KEY ("creditedAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_4f8b61b183f49d152f920cd4ca9"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_e69e33852efd0d31f6b9476f329"`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "creditedAccountIdId" integer`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD "debitedAccountIdId" integer`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_8c7703f23cb340a11cc96caeb99" FOREIGN KEY ("creditedAccountIdId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_d96c592e21b5e8c2b85bdc0ab95" FOREIGN KEY ("debitedAccountIdId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
