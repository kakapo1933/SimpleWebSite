import { Router } from 'express';
import { todoController } from '../controllers/todoController';
import { catchAsync } from '../utils/catchAsync';

const router = Router();

// Get all todos
router.get('/', catchAsync(todoController.getTodos));

// Get a single todo by ID
router.get('/:id', catchAsync(todoController.getTodoById));

// Create a new todo
router.post('/', catchAsync(todoController.createTodo));

// Update a todo
router.put('/:id', catchAsync(todoController.updateTodo));

// Delete a todo
router.delete('/:id', catchAsync(todoController.deleteTodo));

// Toggle todo completion status
router.patch('/:id/toggle', catchAsync(todoController.toggleTodoStatus));

export default router;
