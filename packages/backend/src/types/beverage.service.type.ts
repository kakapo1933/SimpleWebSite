/**
 * Type definitions for beverage-related API requests and responses.
 */

/**
 * Interface for query parameters when fetching beverages.
 */
export interface GetBeveragesQuery {
  popular?: string;
  new?: string;
  categoryId?: string;
}

/**
 * Interface for query parameters when fetching a specific beverage.
 */
export interface GetBeverageByIdParams {
  id: string;
}

/**
 * Interface for query parameters when fetching a specific beverage category.
 */
export interface GetBeverageCategoryByIdParams {
  id: string;
}

/**
 * Interface for beverage filter used in repository queries.
 */
export interface BeverageFilter {
  isPopular?: boolean;
  isNew?: boolean;
  categoryId?: number;
}