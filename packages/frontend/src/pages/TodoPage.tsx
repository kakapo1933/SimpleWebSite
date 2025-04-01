import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import type { Todo, CreateTodoInput } from '../types/todo.types';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<CreateTodoInput>({
    title: '',
    description: '',
    priority: 'medium'
  });

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await todoService.getTodos();
        if (response.success) {
          // Handle both array and single object responses
          if (Array.isArray(response.data)) {
            setTodos(response.data);
          } else if (Array.isArray(response.data.data)) {
            // Some APIs might nest data in a data property
            setTodos(response.data.data);
          } else {
            // If it's a single object, wrap it in an array
            setTodos([response.data as Todo]);
          }
        } else {
          setError(response.message || 'Failed to load todos');
        }
      } catch (err) {
        setError('Failed to load todos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to create a new todo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate title
    if (!newTodo.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      const response = await todoService.createTodo(newTodo);
      if (response.success) {
        // Handle the response data properly
        const newTodoItem = Array.isArray(response.data) ? response.data[0] : response.data as Todo;
        
        // Add the new todo to the beginning of the list
        setTodos(prev => [newTodoItem, ...prev]);
        
        // Reset the form
        setNewTodo({
          title: '',
          description: '',
          priority: 'medium'
        });
        setError(null);
      } else {
        setError(response.message || 'Failed to create todo');
      }
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  // Handle toggling a todo's completion status
  const handleToggleComplete = async (id: number) => {
    try {
      // Optimistically update the UI first for better user experience
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      
      // Then make the API call
      const response = await todoService.toggleTodoStatus({ id });
      
      if (response.success) {
        // Update with the server response data to ensure consistency
        const updatedTodo = Array.isArray(response.data) ? response.data[0] : response.data as Todo;
        
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? updatedTodo : todo
          )
        );
      } else {
        // If the request failed, revert the optimistic update
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
        setError(response.message || 'Failed to update todo');
      }
    } catch (err) {
      // If there was an error, also revert the optimistic update
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setError('Failed to update todo');
      console.error(err);
    }
  };

  // Handle deleting a todo
  const handleDelete = async (id: number) => {
    // Store the current todo for potential recovery
    const todoToDelete = todos.find(todo => todo.id === id);
    
    // Optimistically remove the todo from the list
    setTodos(prev => prev.filter(todo => todo.id !== id));
    
    try {
      const response = await todoService.deleteTodo({ id });
      if (!response.success) {
        // If the API call fails, restore the deleted todo
        if (todoToDelete) {
          setTodos(prev => [...prev, todoToDelete]);
        }
        setError(response.message || 'Failed to delete todo');
      }
    } catch (err) {
      // If there's an error, restore the deleted todo
      if (todoToDelete) {
        setTodos(prev => [...prev, todoToDelete]);
      }
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md p-4">
      <h1 className="text-3xl font-bold text-slate-800">Todo List</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {/* Create Todo Form */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">Add New Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTodo.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter todo title"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newTodo.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter description"
              rows={3}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={newTodo.priority || 'medium'}
              onChange={handleInputChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Add Todo
          </button>
        </form>
      </div>
      
      {/* Todo List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b text-slate-700">My Todos</h2>
        
        {loading ? (
          <div className="p-4 text-center text-slate-600">Loading todos...</div>
        ) : todos.length === 0 ? (
          <div className="p-4 text-center text-slate-600">No todos yet. Add one above!</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {todos.map((todo) => (
              <li key={todo.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        checked={Boolean(todo?.completed)}
                        onChange={() => handleToggleComplete(todo.id)}
                        className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                    </div>
                    
                    {/* Todo content */}
                    <div>
                      <h3 className={`text-lg font-medium ${todo?.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`mt-1 text-sm ${todo?.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                          {todo.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                          todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {todo.priority || 'Normal'}
                        </span>
                        {todo.dueDate && (
                          <span className="text-xs text-slate-500">
                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Delete todo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}