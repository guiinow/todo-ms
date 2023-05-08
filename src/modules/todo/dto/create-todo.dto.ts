import { OmitType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { TodoEntity } from '../entities/todo.entity';
export class CreateTodoDto extends OmitType(TodoEntity, ['id', 'done'] as const) {
  @IsString()
  taskId: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
