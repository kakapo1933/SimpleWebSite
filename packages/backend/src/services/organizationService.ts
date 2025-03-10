import { OrganizationRepository } from "../repositories/organizationRepository";
import { organizations } from "@prisma/client"

/**
 * Retrieves a list of organizations from the database with a specified limit and offset.
 *
 * @param {string} limit - The maximum number of organizations to retrieve. Defaults to 10.
 * @param {string} offset - The number of organizations to skip before starting to retrieve. Defaults to 0.
 * @return {Promise<Array<organizations>>} A promise that resolves to an array of organization records.
 */
async function getOrganizations(limit: string = '10', offset: string = '0'): Promise<Array<organizations>> {
  return await OrganizationRepository.getOrganizations(limit, offset);
}

/**
 * Fuzzy search
 * Searches for organizations based on the specified search term and filters results
 * using similarity thresholds and pagination parameters.
 *
 * @param {string} searchTerm - The search term used to match organization names or tax IDs.
 * @param {string} [similarityThreshold] - The minimum similarity score required for a match.
 * @param {string} [pageSize] - The maximum number of organizations to retrieve per page.
 * @return {Promise<Array<organizations>>} A promise that resolves to an array of organizations matching the search criteria.
 */
async function searchOrganizations(searchTerm: string,
  similarityThreshold: number,
  pageSize: number,): Promise<Array<organizations>> {
  return await OrganizationRepository.searchOrganizations(searchTerm, similarityThreshold, pageSize);
}

export const OrganizationService = {
  getOrganizations,
  searchOrganizations
}