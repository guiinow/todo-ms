import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './modules/todo/todo.module';
import { DataSource } from 'typeorm';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TodoModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
