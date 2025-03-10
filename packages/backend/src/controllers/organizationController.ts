import { Request, Response } from 'express';
import { OrganizationService } from '../services';
import { ResponseHandler } from "../utils/responseHandler";
import { GetOrganizationQuery, SearchOrganizationsQuery } from "../types";
import { PlannedError } from "../utils/customError";

const DEFAULT_LIMIT = '20';
const DEFAULT_OFFSET = '0';
const DEFAULT_SIMILARITY_THRESHOLD = '0.2';
const SEARCH_TERM_MAX_LENGTH = '255';

/**
 * Fetches a list of organizations based on the provided query parameters for pagination.
 * Handles the request and response lifecycle, and forwards errors to the next middleware.
 *
 * @param {Request} req - The HTTP request object containing query parameters for pagination, such as `limit` and `offset`.
 * @param {Response} res - The HTTP response object used to send the organizations data or a success status to the client.
 * @return {Promise<void>} A promise that resolves when the response handling is complete.
 */
async function getOrganizations(req: Request<object, object, object, GetOrganizationQuery>,
  res: Response): Promise<void> {
  let {
    limit,
    offset
  } = req.query;
  if (!limit || limit === 'undefined') {
    limit = DEFAULT_LIMIT;
  }
  if (!offset || offset === 'undefined') {
    offset = DEFAULT_OFFSET;
  }
  const organizations = await OrganizationService.getOrganizations(limit, offset);
  ResponseHandler.success(res, organizations, '[Organizations fetched successfully]');
  return
}

/**
 * Fuzzy search
 * Searches for organizations based on a search query and an optional similarity threshold.
 *
 * @param {Request<object, object, object, SearchOrganizationsQuery>} req - The request object containing the search query and optional similarity threshold.
 * @param {Response} res - The response object used to send back the results or an error message.
 * @return {Promise<void>} A promise that resolves to a response containing the search results or an error message.
 */
async function searchOrganizations(req: Request<object, object, object, SearchOrganizationsQuery>,
  res: Response,): Promise<void> {

  const { searchTerm } = req.query;
  let {
    similarityThreshold,
    limit,
  } = req.query;

  if (!searchTerm) {
    ResponseHandler.error(res, '[Invalid search term][Search term is required]');
    PlannedError('[Bad Request][Invalid search term]', '[Search term is required]');
    return;
  }

  if (!similarityThreshold || similarityThreshold === 'undefined') {
    similarityThreshold = DEFAULT_SIMILARITY_THRESHOLD;
  }

  if (!limit || limit === 'undefined') {
    limit = DEFAULT_LIMIT;
  }

  if (searchTerm.length > Number(SEARCH_TERM_MAX_LENGTH)) {
    ResponseHandler.error(res, `[Invalid search term][Search term must be fewer than ${SEARCH_TERM_MAX_LENGTH} characters]`);
    PlannedError('[Bad Request][Invalid search term]', `[Search term must be fewer than ${SEARCH_TERM_MAX_LENGTH} characters]`);
    return;
  }

  // Validate similarity threshold if provided and if it's a number between 0 and 1
  if (similarityThreshold && (isNaN(Number(similarityThreshold)) || Number(similarityThreshold) < 0 || Number(similarityThreshold) > 1)) {
    ResponseHandler.error(res, `[Invalid similarity threshold ${similarityThreshold}][Similarity threshold must be a number between 0 and 1]`);
    PlannedError(`[Bad Request][Invalid similarity threshold ${similarityThreshold}]`, '[Similarity threshold must be a number between 0 and 1]',)
    return;
  }

  const organizations = await OrganizationService.searchOrganizations(searchTerm, Number(similarityThreshold), Number(limit));

  ResponseHandler.success(res, organizations, `[Organizations matched successfully.][You found ${organizations.length} organization(s)]`);
  return;
}

export const organizationController = {
  getOrganizations,
  searchOrganizations,
}