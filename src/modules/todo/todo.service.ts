import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { MappedException } from 'nestjs-mapped-exception';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  IGetOneTaskByIdOutput,
  ITaskController,
} from './interface/grpc/task-service.interface';
import { TodoEntity } from './entities/todo.entity';
import { TodoException } from './todo.exception';

@Injectable()
export class TodoService {
  private taskController: ITaskController;

  @Inject(MappedException)
  private readonly exception: MappedException<TodoException>;

  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @Inject('TASKS_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.taskController =
      this.client.getService<ITaskController>('TasksService');
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const { taskId, done } = createTodoDto; //desestruturacao de objeto

    const task: IGetOneTaskByIdOutput = await this.requestOneTask(taskId);

    this.validIfTaskIsActive(task);

    await this.validIfTaskAlreadyIsAssociatedTodo(task);

    const todo = this.todoRepository.create({ taskId, done });

    await this.todoRepository.save(todo);
    return todo;
  }

  async getAll(): Promise<TodoEntity[]> {
    const allTodos = await this.todoRepository.find();
    return allTodos;
  }

  async getOne(id: string): Promise<TodoEntity> {

    const todo = await this.todoRepository.findOne({where: {id: id}});
    if (!todo) {
      this.exception.ERRORS.NOT_FOUND.throw();
    }

    return todo;
    
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

    const done = updateTodoDto.done;
    const  todo = await this.getOne(id);
    const task: IGetOneTaskByIdOutput = await this.requestOneTask(todo.taskId);
    this.validIfTaskIsActive(task);
    todo.done = done === undefined ? todo.done : done;
    await this.todoRepository.save(todo);
    return todo;

  }

  remove(id: string) {
    return `This action removes a #${id} todo`;
  }

  private async getTaskById(taskId: string) {
    const taskObservable = this.taskController.findOne({ id: taskId });

    try {
      const task = await lastValueFrom(taskObservable);
      return task;
    } catch (error) {
      this.exception.ERRORS.INTERNAL_SERVER_ERROR.throw();
    }
  }

  validIfTaskIsActive(task: IGetOneTaskByIdOutput): void {
    if (task.active === false) {
      this.exception.ERRORS.TASK_INACTIVE.throw();
    }
  }

  async requestOneTask(taskId: string): Promise<IGetOneTaskByIdOutput> {
    try {
      const task = await this.getTaskById(taskId);
      return task;
    } catch (error) {
      this.exception.ERRORS.TODO_TASK_GRPC_COMMUNICATION_ERROR.throw();
    }
  }

  async validIfTaskAlreadyIsAssociatedTodo(
    task: IGetOneTaskByIdOutput,
  ): Promise<void> {
    const associatedTodo = await this.todoRepository.findOne({
      where: { taskId: task.id },
    });
    if (associatedTodo) {
      this.exception.ERRORS.TASK_ALREADY_ASSOCIATED_TODO.throw();
    }
  }
}
