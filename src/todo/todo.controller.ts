import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDto } from './dto/create-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() createTodoDto: createTodoDto) {
    return this.todoService.createTodo({
      ...createTodoDto,
    });
  }

  @Get()
  findAll(@Query('completed') completed?: boolean) {
    return this.todoService.findAll(completed);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: updateTodoDto) {
    return this.todoService.updateTodo(+id, updateTodoDto);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    return this.todoService.removeTodo(+id);
  }
}
