import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || 5434),
  username: process.env.TYPEORM_USERNAME || 'guiinow',
  password: process.env.TYPEORM_PASSWORD || '123456',
  database: process.env.TYPEORM_DATABASE || 'tododb',
  synchronize: !!process.env.DEBUG,
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
});
