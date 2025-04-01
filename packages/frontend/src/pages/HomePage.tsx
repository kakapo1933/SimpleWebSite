import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { todoService } from '../services/todoService';
import type { Todo } from '../types';

/**
 * HomePage component serves as the main landing page for the SimpleWebSite application.
 * It provides an overview of the application's features and navigation to other sections.
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col max-w-md w-full h-full bg-slate-100 overflow-auto">
      {/* Hero Section */}
      <div className="bg-slate-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">SimpleWebSite</h1>
        <p className="text-xl">Your one-stop platform for donations and beverages</p>
      </div>

      {/* Features Section */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Features</h2>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Donations Feature */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-teal-400">Donations</h3>
            <p className="text-slate-950 mb-4">
              Browse and donate to various organizations. Search by name and explore with infinite scrolling.
            </p>
            <Link 
              to="/donations" 
              className="block w-full bg-slate-600 text-white py-2 px-4 rounded text-center hover:bg-slate-700 transition-colors"
            >
              {t('donationPage')}
            </Link>
          </div>

          {/* Beverages Feature */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-teal-400">Beverages</h3>
            <p className="text-slate-950 mb-4">
              Order your favorite drinks with customization options. Create group orders and manage your cart.
            </p>
            <Link 
              to="/beverages" 
              className="block w-full bg-slate-600 text-white py-2 px-4 rounded text-center hover:bg-slate-700 transition-colors"
            >
              Beverages
            </Link>
          </div>

          {/* Todo Feature */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-teal-400">Todo List</h3>
            <p className="text-slate-950 mb-4">
              Manage your tasks with our simple todo list. Create, update, and track your todos.
            </p>
            <Link 
              to="/todos" 
              className="block w-full bg-slate-600 text-white py-2 px-4 rounded text-center hover:bg-slate-700 transition-colors"
            >
              View All Todos
            </Link>
          </div>
        </div>
      </div>

      {/* Todo List Section */}
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Todos</h2>

        {loading ? (
          <div className="text-center text-slate-600">Loading todos...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : todos.length === 0 ? (
          <div className="text-center text-slate-600">No todos yet. Add one on the Todo page!</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {todos.slice(0, 3).map((todo) => (
              <li key={todo.id} className="py-3 flex items-start">
                <input
                  type="checkbox"
                  checked={Boolean(todo?.completed)}
                  readOnly
                  className="h-5 w-5 rounded border-slate-300 text-teal-600 mt-1 mr-3"
                />
                <div>
                  <h3 className={`text-lg font-medium ${todo?.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {todo.title}
                  </h3>
                  {todo.priority && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                      todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {todo.priority}
                    </span>
                  )}
                </div>
              </li>
            ))}
            {todos.length > 3 && (
              <li className="py-3 text-center">
                <Link to="/todos" className="text-teal-600 hover:text-teal-800">
                  View all {todos.length} todos
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* About Section */}
      <div className="bg-slate-200 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">About SimpleWebSite</h2>
        <p className="text-slate-950 mb-4">
          SimpleWebSite is a full-stack web application that serves as a donation platform and beverage ordering system.
          Built with React, TypeScript, Node.js, and PostgreSQL, it provides a seamless user experience with a mobile-first design.
        </p>
      </div>
    </div>
  );
};

export default HomePage;