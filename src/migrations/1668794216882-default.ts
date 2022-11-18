import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668794216882 implements MigrationInterface {
    name = 'default1668794216882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Account" ("id" SERIAL NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transaction" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "DebitedAccount" integer, "CreditedAccount" integer, CONSTRAINT "REL_490a7ff1113fb0d2df04f0f562" UNIQUE ("DebitedAccount"), CONSTRAINT "REL_b11320013b9f19d5a2d57fde2c" UNIQUE ("CreditedAccount"), CONSTRAINT "PK_21eda4daffd2c60f76b81a270e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "accountId" integer, CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "REL_9e4ed07a5efbe3bba6d0928665" UNIQUE ("accountId"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_490a7ff1113fb0d2df04f0f5622" FOREIGN KEY ("DebitedAccount") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_b11320013b9f19d5a2d57fde2cf" FOREIGN KEY ("CreditedAccount") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_9e4ed07a5efbe3bba6d09286651" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_9e4ed07a5efbe3bba6d09286651"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_b11320013b9f19d5a2d57fde2cf"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_490a7ff1113fb0d2df04f0f5622"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Transaction"`);
        await queryRunner.query(`DROP TABLE "Account"`);
    }

}
