import { useState, useEffect } from 'react';
import './App.css';
import { apiService } from './services/api';
import { User, HealthCheckResponse } from 'common';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check health status
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const healthResponse = await apiService.checkHealth();
        setHealth(healthResponse);
      } catch (err) {
        setError('Failed to connect to server. Please ensure the backend is running.');
      }
    };

    checkHealth();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getUsers();

        if (response.status === 'success' && response.data) {
          setUsers(response.data);
        } else {
          setError(response.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError('An error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };

    if (health?.status === 'ok') {
      fetchUsers();
    }
  }, [health]);

  // Form state for creating a new user
  const [formData, setFormData] = useState({ email: '', name: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiService.createUser(formData);

      if (response.status === 'success' && response.data) {
        setUsers([...users, response.data]);
        setFormData({ email: '', name: '' });
      } else {
        setError(response.message || 'Failed to create user');
      }
    } catch (err) {
      setError('An error occurred while creating user');
    }
  };

  return (
    <div className="App">
      <h1>React + Express + Prisma + PostgreSQL Monorepo</h1>

      <div className="card">
        <h2>API Health Status</h2>
        {!health && !error && <p>Checking connection...</p>}
        {health && (
          <p className={health.status === 'ok' ? 'success' : 'error'}>
            Status: {health.status} - {health.message}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </div>

      {health?.status === 'ok' && (
        <>
          <div className="card">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Create User</button>
            </form>
          </div>

          <div className="card">
            <h2>User List</h2>
            {loading ? (
              <p>Loading users...</p>
            ) : users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id.substring(0, 8)}...</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found. Create one!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
