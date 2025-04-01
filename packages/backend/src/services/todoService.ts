import { TodoRepository } from '../repositories/todoRepository';
import { Todo } from '@prisma/client';

/**
 * Gets all todos
 * 
 * @returns {Promise<Array<Todo>>} A promise with an array of todos
 */
const getTodos = async (): Promise<Array<Todo>> => {
  return await TodoRepository.findAll();
};

/**
 * Gets a single todo by ID
 * 
 * @param {number} id - The todo ID
 * @returns {Promise<Todo | null>} A promise with the todo or null if not found
 */
const getTodoById = async (id: number): Promise<Todo | null> => {
  return await TodoRepository.findById(id);
};

/**
 * Creates a new todo
 * 
 * @param {Object} todoData - The todo data
 * @returns {Promise<Todo>} A promise with the created todo
 */
const createTodo = async (todoData: {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
}): Promise<Todo> => {
  return await TodoRepository.create(todoData);
};

/**
 * Updates a todo
 * 
 * @param {number} id - The todo ID
 * @param {Object} todoData - The updated todo data
 * @returns {Promise<Todo>} A promise with the updated todo
 */
const updateTodo = async (id: number, todoData: {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: string;
  dueDate?: Date;
}): Promise<Todo> => {
  return await TodoRepository.update(id, todoData);
};

/**
 * Toggles a todo's completed status
 * 
 * @param {number} id - The todo ID
 * @returns {Promise<Todo | null>} A promise with the updated todo or null if not found
 */
const toggleTodoStatus = async (id: number): Promise<Todo | null> => {
  return await TodoRepository.toggleStatus(id);
};

/**
 * Deletes a todo
 * 
 * @param {number} id - The todo ID
 * @returns {Promise<Todo>} A promise with the deleted todo
 */
const deleteTodo = async (id: number): Promise<Todo> => {
  return await TodoRepository.remove(id);
};

export const TodoService = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo
};