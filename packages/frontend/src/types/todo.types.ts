import { Todo as CommonTodo, TodoCreate } from 'common';

export type ITodo = CommonTodo;
export type ICreateTodoInput = TodoCreate;

export interface ITodoUpdateInput {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date | string;
}

export interface ITodoToggleInput {
  id: number;
}

export interface ITodoDeleteInput {
  id: number;
}
