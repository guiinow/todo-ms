import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { TodoEntity } from '../entities/todo.entity';

export class CreateTodoDto extends OmitType(TodoEntity, [
  'id',
  'done',
] as const) {
  @ApiProperty({ description: 'ID da tarefa associada', type: String })
  @IsString()
  taskId: string;

  @ApiProperty({
    description: 'Status de conclusão da tarefa',
    type: Boolean,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
