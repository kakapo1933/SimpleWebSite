import { ApiResponse } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('VITE_BASE_URL environment variable is not defined');
}

/**
 * Asynchronous function to fetch and parse JSON data from a given URL.
 *
 * @template T Defines the expected type of the JSON response.
 * @param {string} url The URL to fetch data from.
 * @param {RequestInit} [options] Optional configuration object for the fetch request.
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response of type T.
 * @throws {Error} Throws an error if the HTTP response status is not OK (status code not in the range 200-299).
 */
const fetchJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() satisfies Promise<T>;
};

/**
 * Builds a complete API URL by combining base API URL with endpoint path
 * @param endpoint - The API endpoint path (with or without leading slash)
 * @throws Error if endpoint is empty or not a string
 * @returns Complete API URL
 */
const buildV1RestApiUrl = (endpoint: string): string => {
  const URL_SEPARATOR = '/';
  if (!endpoint) {
    throw new Error('API endpoint must be a non-empty string');
  }

  // Remove leading/trailing slashes and normalize multiple consecutive slashes
  // e.g. ///foo/////bar/// -> foo/bar
  const sanitizedEndpoint = endpoint.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  const sanitizedBaseUrl = BASE_URL.replace(/\/+$/, '');

  return `${sanitizedBaseUrl}${URL_SEPARATOR}${sanitizedEndpoint}`;
};

export { fetchJson, buildV1RestApiUrl };

/**
 * Type for values that can be converted to strings for URL parameters
 */
type QueryParamValue = string | number | boolean | null | undefined;
/**
 * Type-safe definition for objects that can be used as query parameters
 */
export type QueryParams = Record<string, QueryParamValue>;

/**
 * Configuration options for API requests
 */
export interface RequestOptions<T extends QueryParams> {
  signal?: AbortSignal;
  params?: T;
}

/**
 * Generic API request function with improved error handling
 *
 * @param endpoint - API endpoint path
 * @param options - Request options including signal and query parameters
 * @returns Promise resolving to the API response
 * @throws Error with detailed message if the request fails
 */
export async function apiRequestV1<T, P extends QueryParams = QueryParams>(
  endpoint: string,
  options?: RequestOptions<P>
): Promise<ApiResponse<T>> {
  try {
    const url = buildV1RestApiUrl(endpoint);
    const fullUrl = options?.params
      ? buildUrlWithQueryParams(url, options.params)
      : url;

    return await fetchJson<ApiResponse<T>>(fullUrl, { signal: options?.signal });
  } catch (error) {
    // Enhanced error handling with more context
    const errorMessage = error instanceof Error
      ? error.message
      : 'Unknown error occurred';

    throw new Error(`API request to ${endpoint} failed: ${errorMessage}`);
  }
}

/**
 * Builds a URL with query parameters
 *
 * @param baseUrl - Base URL without query parameters
 * @param params - Object containing query parameters
 * @returns Complete URL with query parameters
 */
export function buildUrlWithQueryParams<T extends QueryParams>(baseUrl: string, params?: T): string {
  // Return the base URL if there are no params or params is empty
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  // Create a URLSearchParams object and populate it
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    // Skip undefined or null values
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  // Only append the query string if there are parameters
  const queryString = searchParams.toString();
  if (queryString) {
    return `${baseUrl}?${queryString}`;
  }

  return baseUrl;
}