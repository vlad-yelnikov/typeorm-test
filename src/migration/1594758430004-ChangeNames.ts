import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNames1594758430004 implements MigrationInterface {
  name = 'ChangeNames1594758430004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "position" character varying NOT NULL, "company_id" integer, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "hobbies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_4dce5d186533856c1f47e2a76d7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "hobbies_employees" ("hobby_id" integer NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_27a40d81609be684d072316e2cf" PRIMARY KEY ("hobby_id", "employee_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e0fe7efa74d160887e2f01be32" ON "hobbies_employees" ("hobby_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5fbd50e9da7b59ff4e089e8ff5" ON "hobbies_employees" ("employee_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_7f3eeef59eece4147effe7bfa6a" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "hobbies_employees" ADD CONSTRAINT "FK_e0fe7efa74d160887e2f01be32c" FOREIGN KEY ("hobby_id") REFERENCES "hobbies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "hobbies_employees" ADD CONSTRAINT "FK_5fbd50e9da7b59ff4e089e8ff51" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hobbies_employees" DROP CONSTRAINT "FK_5fbd50e9da7b59ff4e089e8ff51"`
    );
    await queryRunner.query(
      `ALTER TABLE "hobbies_employees" DROP CONSTRAINT "FK_e0fe7efa74d160887e2f01be32c"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_7f3eeef59eece4147effe7bfa6a"`
    );
    await queryRunner.query(`DROP INDEX "IDX_5fbd50e9da7b59ff4e089e8ff5"`);
    await queryRunner.query(`DROP INDEX "IDX_e0fe7efa74d160887e2f01be32"`);
    await queryRunner.query(`DROP TABLE "hobbies_employees"`);
    await queryRunner.query(`DROP TABLE "hobbies"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TABLE "employees"`);
  }
}
