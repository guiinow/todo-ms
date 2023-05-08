import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { TodoException } from './todo.exception';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    MappedExceptionModule.forFeature(TodoException, { prefix: 'TODOS_ERROR' }),
    TypeOrmModule.forFeature([TodoEntity]),
    ClientsModule.register([
      {
        name: 'TASKS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'task',
          protoPath: join(__dirname, 'proto/task.proto'),
          url: process.env.TASK_GRPC_HOST || '0.0.0.0:50051',
        },
      },
    ]),
  ],
})
export class TodoModule {}
