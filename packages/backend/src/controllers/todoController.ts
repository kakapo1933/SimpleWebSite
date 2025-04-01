import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';
import { ResponseHandler } from "../utils/responseHandler";

/**
 * Fetches all todos.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
async function getTodos(req: Request, res: Response): Promise<void> {
  const todos = await TodoService.getTodos();
  ResponseHandler.success(res, todos, '[Todos fetched successfully]');
}

/**
 * Fetches a single todo by ID.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
async function getTodoById(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    ResponseHandler.error(res, '[Invalid todo ID][Todo ID must be a number]');
    return;
  }
  
  const todo = await TodoService.getTodoById(id);
  
  if (!todo) {
    ResponseHandler.error(res, '[Todo not found][No todo exists with this ID]', 404);
    return;
  }
  
  ResponseHandler.success(res, todo, '[Todo fetched successfully]');
}

/**
 * Creates a new todo.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
async function createTodo(req: Request, res: Response): Promise<void> {
  const { title, description, priority, dueDate } = req.body;
  
  if (!title || typeof title !== 'string' || title.trim() === '') {
    ResponseHandler.error(res, '[Invalid title][Title is required and must be a non-empty string]');
    return;
  }
  
  // Validate priority if provided
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    ResponseHandler.error(res, '[Invalid priority][Priority must be one of: low, medium, high]');
    return;
  }
  
  // Convert dueDate string to Date object if provided
  let parsedDueDate: Date | undefined;
  if (dueDate) {
    parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      ResponseHandler.error(res, '[Invalid due date][Due date must be a valid date string]');
      return;
    }
  }
  
  const todoData = {
    title,
    description,
    priority,
    dueDate: parsedDueDate
  };
  
  const newTodo = await TodoService.createTodo(todoData);
  ResponseHandler.success(res, newTodo, '[Todo created successfully]', 201);
}

/**
 * Updates a todo.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
async function updateTodo(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    ResponseHandler.error(res, '[Invalid todo ID][Todo ID must be a number]');
    return;
  }
  
  const { title, description, completed, priority, dueDate } = req.body;
  
  // Validate title if provided
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    ResponseHandler.error(res, '[Invalid title][Title must be a non-empty string]');
    return;
  }
  
  // Validate completed if provided
  if (completed !== undefined && typeof completed !== 'boolean') {
    ResponseHandler.error(res, '[Invalid completed status][Completed must be a boolean]');
    return;
  }
  
  // Validate priority if provided
  if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
    ResponseHandler.error(res, '[Invalid priority][Priority must be one of: low, medium, high]');
    return;
  }
  
  // Convert dueDate string to Date object if provided
  let parsedDueDate: Date | undefined;
  if (dueDate) {
    parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      ResponseHandler.error(res, '[Invalid due date][Due date must be a valid date string]');
      return;
    }
  }
  
  try {
    const updatedTodo = await TodoService.updateTodo(id, {
      title,
      description,
      completed,
      priority,
      dueDate: parsedDueDate
    });
    
    ResponseHandler.success(res, updatedTodo, '[Todo updated successfully]');
  } catch (error) {
    // Handle case where todo doesn't exist
    ResponseHandler.error(res, '[Todo not found][No todo exists with this ID]', 404);
  }
}

/**
 * Toggles a todo's completed status.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
async function toggleTodoStatus(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    ResponseHandler.error(res, '[Invalid todo ID][Todo ID must be a number]');
    return;
  }
  
  const updatedTodo = await TodoService.toggleTodoStatus(id);
  
  if (!updatedTodo) {
    ResponseHandler.error(res, '[Todo not found][No todo exists with this ID]', 404);
    return;
  }
  
  ResponseHandler.success(res, updatedTodo, '[Todo status toggled successfully]');
}

/**
 * Deletes a todo.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 */
async function deleteTodo(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    ResponseHandler.error(res, '[Invalid todo ID][Todo ID must be a number]');
    return;
  }
  
  try {
    const deletedTodo = await TodoService.deleteTodo(id);
    ResponseHandler.success(res, deletedTodo, '[Todo deleted successfully]');
  } catch (error) {
    // Handle case where todo doesn't exist
    ResponseHandler.error(res, '[Todo not found][No todo exists with this ID]', 404);
  }
}

export const todoController = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo
};