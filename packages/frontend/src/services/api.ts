import { HealthCheckResponse, Organization } from 'common';
import { buildV1RestApiUrl, fetchJson } from "../utils/http";
import { ApiResponse, GetOrganizationsQueryParams, SearchOrganizationsQueryParams } from '../types'

// Health check
const checkHealth = async (): Promise<HealthCheckResponse> => {
  const apiEndpoint = buildV1RestApiUrl('/health');
  return await fetchJson(apiEndpoint) satisfies HealthCheckResponse;
}

// Organization endpoints
const getOrganizations = async (params?: GetOrganizationsQueryParams,
  signal?: AbortSignal): Promise<ApiResponse<Organization>> => {
  let apiEndpoint = buildV1RestApiUrl('/organizations');

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    apiEndpoint += `?${searchParams.toString()}`;
    console.log(apiEndpoint);
  }

  return await fetchJson(apiEndpoint, { signal }) satisfies ApiResponse<Organization>;
}

// Search organizations
const searchOrganizations = async (params: SearchOrganizationsQueryParams,
  signal?: AbortSignal): Promise<ApiResponse<Organization>> => {
  let apiEndpoint = buildV1RestApiUrl(`/organizations/search`);

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    apiEndpoint += `?${searchParams.toString()}`;
    console.log(apiEndpoint);
  }
  return await fetchJson(apiEndpoint, { signal }) satisfies ApiResponse<Organization>;
};

export const apiService = {
  checkHealth,
  getOrganizations,
  searchOrganizations
};