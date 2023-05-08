import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1672237432355 implements MigrationInterface {
  name = 'migration1672237432355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "todoId" uuid NOT NULL, "done" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_32c10cf78b9d9301f7ea34e48af" UNIQUE ("todoId"), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
