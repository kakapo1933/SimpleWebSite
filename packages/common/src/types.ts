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
    contact_information?: Record<string, any>;
    status?: string;
    registration_date?: Date;
    website?: string;
    social_media?: Record<string, any>;
    notes?: string;
}

export { HealthCheckResponse, Organization };