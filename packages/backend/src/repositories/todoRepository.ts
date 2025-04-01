import { prisma } from '../models/PrismaClient';
import type { Todo } from '@prisma/client';

/**
 * Retrieves all todos, ordered by creation date (newest first).
 * 
 * @returns {Promise<Array<Todo>>} A promise that resolves to an array of todos.
 */
const findAll = async (): Promise<Array<Todo>> => {
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

/**
 * Finds a todo by its ID.
 * 
 * @param {number} id - The ID of the todo to find.
 * @returns {Promise<Todo | null>} A promise that resolves to the found todo or null.
 */
const findById = async (id: number): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: { id }
  });
};

/**
 * Creates a new todo.
 * 
 * @param {Object} data - The todo data.
 * @param {string} data.title - The title of the todo.
 * @param {string} [data.description] - Optional description of the todo.
 * @param {string} [data.priority] - Optional priority of the todo.
 * @param {Date} [data.dueDate] - Optional due date of the todo.
 * @returns {Promise<Todo>} A promise that resolves to the created todo.
 */
const create = async (data: {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
}): Promise<Todo> => {
  return await prisma.todo.create({
    data
  });
};

/**
 * Updates a todo by its ID.
 * 
 * @param {number} id - The ID of the todo to update.
 * @param {Object} data - The todo data to update.
 * @returns {Promise<Todo>} A promise that resolves to the updated todo.
 */
const update = async (id: number, data: {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: string;
  dueDate?: Date;
}): Promise<Todo> => {
  return await prisma.todo.update({
    where: { id },
    data
  });
};

/**
 * Toggles the completed status of a todo.
 * 
 * @param {number} id - The ID of the todo to toggle.
 * @returns {Promise<Todo | null>} A promise that resolves to the updated todo or null if not found.
 */
const toggleStatus = async (id: number): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: { id }
  });

  if (!todo) return null;

  return await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed }
  });
};

/**
 * Deletes a todo by its ID.
 * 
 * @param {number} id - The ID of the todo to delete.
 * @returns {Promise<Todo>} A promise that resolves to the deleted todo.
 */
const remove = async (id: number): Promise<Todo> => {
  return await prisma.todo.delete({
    where: { id }
  });
};

export const TodoRepository = {
  findAll,
  findById,
  create,
  update,
  toggleStatus,
  remove
};