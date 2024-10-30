import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todo') // Agrupa endpoints do TodoController na documentação
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo TODO' })
  @ApiResponse({ status: 201, description: 'TODO criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os TODOs' })
  @ApiResponse({ status: 200, description: 'Lista de todos os TODOs.' })
  findAll() {
    return this.todoService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um TODO por ID' })
  @ApiResponse({ status: 200, description: 'TODO encontrado.' })
  @ApiResponse({ status: 404, description: 'TODO não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do TODO' })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um TODO existente' })
  @ApiResponse({ status: 200, description: 'TODO atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'TODO não encontrado.' })
  @ApiBody({ type: UpdateTodoDto })
  @ApiParam({ name: 'id', description: 'ID do TODO' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um TODO por ID' })
  @ApiResponse({ status: 200, description: 'TODO removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'TODO não encontrado.' })
  @ApiParam({ name: 'id', description: 'ID do TODO' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
