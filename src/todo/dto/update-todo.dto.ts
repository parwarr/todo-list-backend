import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { createTodoDto } from './create-todo.dto';

export class updateTodoDto extends PartialType(createTodoDto) {}
