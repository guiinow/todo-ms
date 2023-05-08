import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1673291487943 implements MigrationInterface {
  name = 'migration1673291487943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" RENAME COLUMN "todoId" TO "taskId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" RENAME CONSTRAINT "UQ_32c10cf78b9d9301f7ea34e48af" TO "UQ_681a7f7ce5bbf0990f8d51f4e0d"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" RENAME CONSTRAINT "UQ_681a7f7ce5bbf0990f8d51f4e0d" TO "UQ_32c10cf78b9d9301f7ea34e48af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" RENAME COLUMN "taskId" TO "todoId"`,
    );
  }
}
