import { Todo as CommonTodo, TodoCreate } from '@simple-website/common';

export type Todo = CommonTodo;
export type CreateTodoInput = TodoCreate;

export interface TodoUpdateInput {
  id: number;
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date | string;
}

export interface TodoToggleInput {
  id: number;
}

export interface TodoDeleteInput {
  id: number;
}