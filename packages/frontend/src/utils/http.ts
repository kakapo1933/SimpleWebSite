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