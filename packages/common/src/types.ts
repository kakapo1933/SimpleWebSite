// Define API response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// Define basic user interface
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define health check response
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
}