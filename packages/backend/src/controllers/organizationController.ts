import { Request, Response } from 'express';
import { OrganizationService } from '../services';
import { ResponseHandler } from '../utils/responseHandler';
import { GetOrganizationQuery, SearchOrganizationsQuery } from '../types';
import { PlannedError } from '../utils/customError';
import { isValidStringParam, isValidThreshold, parseNumericParam } from '../utils/verifyQueryParams';

// Constants for default values and constraints
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const DEFAULT_SIMILARITY_THRESHOLD = 0.2;
const SEARCH_TERM_MAX_LENGTH = 255;

/**
 * Fetches a list of organizations based on the provided query parameters for pagination.
 * Handles the request and response lifecycle, and forwards errors to the next middleware.
 *
 * @param {Request} req - The HTTP request object containing query parameters for pagination.
 * @param {Response} res - The HTTP response object used to send the organizations data.
 */
async function getOrganizations(
  req: Request<object, object, object, GetOrganizationQuery>,
  res: Response,
): Promise<void> {
  const limit = parseNumericParam(req.query.limit, DEFAULT_LIMIT);
  const offset = parseNumericParam(req.query.offset, DEFAULT_OFFSET);
  const organizations = await OrganizationService.getOrganizations(limit, offset);
  ResponseHandler.success(res, organizations, '[Organizations fetched successfully]');
}

/**
 * Searches for organizations based on a search query and an optional similarity threshold.
 *
 * @param {Request} req - The request object containing the search query and optional parameters.
 * @param {Response} res - The response object used to send back the results.
 */
async function searchOrganizations(
  req: Request<object, object, object, SearchOrganizationsQuery>,
  res: Response,
): Promise<void> {
  const { searchTerm } = req.query;
  
  // Validate required parameter
  if (!isValidStringParam(searchTerm)) {
    ResponseHandler.error(res, '[Invalid search term][Search term is required]');
    PlannedError('[Bad Request][Invalid search term]', '[Search term is required]');
    return;
  }

  // Validate search term length
  if (searchTerm && searchTerm.length > SEARCH_TERM_MAX_LENGTH) {
    ResponseHandler.error(
      res, 
      `[Invalid search term][Search term must be fewer than ${SEARCH_TERM_MAX_LENGTH} characters]`,
    );
    PlannedError('[Bad Request][Invalid search term]', `[Search term must be fewer than ${SEARCH_TERM_MAX_LENGTH} characters]`, true);
    return;
  }

  // Parse and validate numeric parameters
  const limit = parseNumericParam(req.query.limit, DEFAULT_LIMIT);
  const similarityThreshold = parseNumericParam(
    req.query.similarityThreshold, 
    DEFAULT_SIMILARITY_THRESHOLD,
  );

  if (!isValidThreshold(similarityThreshold)) {
    ResponseHandler.error(
      res, 
      `[Invalid similarity threshold ${similarityThreshold}][Similarity threshold must be a number between 0 and 1]`,
    );
    PlannedError(`[Bad Request][Invalid similarity threshold ${similarityThreshold}]`, '[Similarity threshold must be a number between 0 and 1]');
    return;
  }

  // Perform search with validated parameters
  const organizations = await OrganizationService.searchOrganizations(
    searchTerm, 
    similarityThreshold, 
    limit,
  );

  // Send successful response
  ResponseHandler.success(
    res, 
    organizations, 
    `[Organizations matched successfully][You found ${organizations.length} organization(s)]`,
  );
}

export const organizationController = {
  getOrganizations,
  searchOrganizations,
};
