import { HealthCheckResponse, Organization } from 'common';
import { buildV1RestApiUrl, fetchJson, apiRequestV1 } from '../utils/http';
import { ApiResponse, GetOrganizationsQueryParams, SearchOrganizationsQueryParams } from '../types';

/**
 * Checks the health status of the API
 *
 * @returns Promise resolving to the health check response
 */
async function checkHealth(): Promise<HealthCheckResponse> {
  return await fetchJson<HealthCheckResponse>(buildV1RestApiUrl('/health'));
}

/**
 * Fetches organizations with optional pagination parameters
 *
 * @param params - Optional pagination parameters (limit, offset)
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to organizations API response
 */
async function getOrganizations(
  params?: GetOrganizationsQueryParams,
  signal?: AbortSignal
): Promise<ApiResponse<Organization>> {
  return await apiRequestV1<Organization, GetOrganizationsQueryParams>('/organizations', {
    params,
    signal,
  });
}

/**
 * Searches organizations based on search criteria
 *
 * @param params - Search parameters including searchTerm
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to matching organizations
 */
async function searchOrganizations(
  params: SearchOrganizationsQueryParams,
  signal?: AbortSignal
): Promise<ApiResponse<Organization>> {
  return await apiRequestV1<Organization, SearchOrganizationsQueryParams>('/organizations/search', {
    params,
    signal,
  });
}

export const apiService = {
  checkHealth,
  getOrganizations,
  searchOrganizations,
};
