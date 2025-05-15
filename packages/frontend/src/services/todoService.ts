import { apiRequestV1, fetchJson, buildV1RestApiUrl } from '../utils/http';
import type { ApiResponse } from '../types';
import type {
  Todo,
  CreateTodoInput,
  TodoUpdateInput,
  TodoToggleInput,
  TodoDeleteInput,
} from '../types/todo.types';

const TODOS_ENDPOINT = '/todos';

/**
 * Get all todos
 *
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to todos API response
 */
async function getTodos(signal?: AbortSignal): Promise<ApiResponse<Todo>> {
  return await apiRequestV1<Todo>(TODOS_ENDPOINT, { signal });
}

/**
 * Get a single todo by ID
 *
 * @param id - Todo ID
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to todo API response
 */
async function getTodoById(id: number, signal?: AbortSignal): Promise<ApiResponse<Todo>> {
  return await apiRequestV1<Todo>(`${TODOS_ENDPOINT}/${id}`, { signal });
}

/**
 * Create a new todo
 *
 * @param data - Todo creation data
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to created todo API response
 */
async function createTodo(data: CreateTodoInput, signal?: AbortSignal): Promise<ApiResponse<Todo>> {
  const url = buildV1RestApiUrl(TODOS_ENDPOINT);
  return await fetchJson<ApiResponse<Todo>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
}

/**
 * Update a todo
 *
 * @param data - Todo update data including id
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to updated todo API response
 */
async function updateTodo(
  { id, ...data }: TodoUpdateInput,
  signal?: AbortSignal
): Promise<ApiResponse<Todo>> {
  const url = buildV1RestApiUrl(`${TODOS_ENDPOINT}/${id}`);
  return await fetchJson<ApiResponse<Todo>>(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
}

/**
 * Toggle a todo's completed status
 *
 * @param data - Object containing todo id
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to updated todo API response
 */
async function toggleTodoStatus(
  { id }: TodoToggleInput,
  signal?: AbortSignal
): Promise<ApiResponse<Todo>> {
  const url = buildV1RestApiUrl(`${TODOS_ENDPOINT}/${id}/toggle`);
  return await fetchJson<ApiResponse<Todo>>(url, {
    method: 'PATCH',
    signal,
  });
}

/**
 * Delete a todo
 *
 * @param data - Object containing todo id
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to deleted todo API response
 */
async function deleteTodo(
  { id }: TodoDeleteInput,
  signal?: AbortSignal
): Promise<ApiResponse<Todo>> {
  const url = buildV1RestApiUrl(`${TODOS_ENDPOINT}/${id}`);
  return await fetchJson<ApiResponse<Todo>>(url, {
    method: 'DELETE',
    signal,
  });
}

export const todoService = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
};
