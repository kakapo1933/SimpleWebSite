import { ApiResponse, User, HealthCheckResponse } from 'common';

const API_URL = 'http://localhost:3001/api';

export const apiService = {
  // Health check
  checkHealth: async (): Promise<HealthCheckResponse> => {
    const response = await fetch(`${API_URL}/health`);
    return response.json() as Promise<HealthCheckResponse>;
  },

  // User endpoints
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await fetch(`${API_URL}/users`);
    return response.json() as Promise<ApiResponse<User[]>>;
  },

  getUser: async (id: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json() as Promise<ApiResponse<User>>;
  },

  createUser: async (userData: { email: string; name: string }): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json() as Promise<ApiResponse<User>>;
  }
};