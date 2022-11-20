import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668962511625 implements MigrationInterface {
    name = 'default1668962511625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Account" ("id" SERIAL NOT NULL, "balance" real NOT NULL, CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transaction" ("id" SERIAL NOT NULL, "debitedAccountId" integer NOT NULL, "creditedAccountId" integer NOT NULL, "value" real NOT NULL, "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_e96bcb1cf8caf6480a744a29646" PRIMARY KEY ("id", "debitedAccountId", "creditedAccountId"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "accountId" integer, CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "REL_9e4ed07a5efbe3bba6d0928665" UNIQUE ("accountId"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_e69e33852efd0d31f6b9476f329" FOREIGN KEY ("debitedAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_4f8b61b183f49d152f920cd4ca9" FOREIGN KEY ("creditedAccountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_9e4ed07a5efbe3bba6d09286651" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_9e4ed07a5efbe3bba6d09286651"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_4f8b61b183f49d152f920cd4ca9"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_e69e33852efd0d31f6b9476f329"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Transaction"`);
        await queryRunner.query(`DROP TABLE "Account"`);
    }

}
