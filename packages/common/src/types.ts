// Define health check response
interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
}

// Define organization response
interface Organization {
  id: number;
  name: string;
  organization_type?: string;
  tax_id?: string;
  year_established?: number;
  contact_information?: Record<string, unknown>;
  status?: string;
  registration_date?: Date;
  website?: string;
  social_media?: Record<string, unknown>;
  notes?: string;
}

// Define Todo type
interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define TodoCreate type
interface TodoCreate {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export { HealthCheckResponse, Organization, Todo, TodoCreate };