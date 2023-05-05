import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { createTodoDto } from './dto/create-todo.dto';
import { Todo } from '@prisma/client';
import { updateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) {}

  createTodo(createTodoDto: createTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({ data: createTodoDto });
  }

  findAll(completed?: boolean): Promise<Todo[]> {
    if (!completed) {
      return this.prismaService.todo.findMany();
    } else {
      return this.prismaService.todo.findMany({
        where: { completed: completed },
      });
    }
  }

  findOne(id: Todo['id']): Promise<Todo> {
    return this.prismaService.todo.findUnique({
      where: { id },
    });
  }

  async updateTodo(
    id: Todo['id'],
    updateTodoDto: updateTodoDto,
  ): Promise<Todo> {
    const todo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.name = updateTodoDto.name;
    todo.completed = updateTodoDto.completed;
    return this.prismaService.todo.create({
      data: todo,
    });
  }

  removeTodo(id: Todo['id']): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: { id },
    });
  }
}
