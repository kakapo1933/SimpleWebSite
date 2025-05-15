/**
 * Helper function to validate and parse numeric query parameters
 * @param value - The query parameter value to validate
 * @param defaultValue - The default value to use if the query parameter is invalid
 * @returns The validated parameter value as a number
 */
export function parseNumericParam(value: string | undefined, defaultValue: number): number {
  if (!value || value === 'undefined') {
    return defaultValue;
  }

  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Helper function to validate string parameters
 * @param value - The parameter value to validate
 * @returns boolean indicating if the value is valid
 */
export function isValidStringParam(value: string | undefined): value is string {
  return !!value && value !== 'undefined';
}

/**
 * Validates if a given value is a valid similarity threshold (between 0 and 1)
 * @param value - The threshold value to validate
 * @returns boolean indicating if the value is a valid threshold
 */
export function isValidThreshold(value: number): boolean {
  return !isNaN(value) && value >= 0 && value <= 1;
}
