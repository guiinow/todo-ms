import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { TodoEntity } from '../entities/todo.entity';

export class UpdateTodoDto extends PartialType(
  OmitType(TodoEntity, ['id', 'taskId'] as const),
) {
  @ApiProperty({
    description: 'Status de conclusão da tarefa',
    type: Boolean,
    required: false,
  })
  done?: boolean;
}
