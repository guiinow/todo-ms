import { OmitType, PartialType } from '@nestjs/mapped-types';
import { TodoEntity } from '../entities/todo.entity';

export class UpdateTodoDto extends OmitType(TodoEntity, ['id', 'taskId'] as const) {}
