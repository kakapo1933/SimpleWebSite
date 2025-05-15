import { prisma } from '../models/PrismaClient';
import type { organizations } from '@prisma/client';

/**
 * Retrieves a list of organizations with pagination support.
 *
 * @param {number} limit - The maximum number of organizations to retrieve.
 * @param {number} offset - The number of organizations to skip before starting to collect the result set.
 * @returns {Promise<Array<organizations>>} A promise that resolves to an array of organizations.
 */
const getOrganizations = async (limit: number, offset: number): Promise<Array<organizations>> => {
  return await prisma.organizations.findMany({
    take: limit,
    skip: offset,
  });
};

/**
 * Fuzzy search
 * Searches for organizations in the database based on a specified search term and similarity threshold.
 *
 * @param {string} searchTerm - The term used to search for organizations by name or tax ID.
 * @param {number} similarityThreshold - The minimum threshold for similarity score to filter matching organizations.
 * @param {number} pageSize - The maximum number of organizations to return in the result.
 * @returns {Promise<Array<organizations>>} - A promise that resolves to an array of matching organizations. Each object represents an organization.
 */
const searchOrganizations = async (searchTerm: string,
  similarityThreshold: number,
  pageSize: number): Promise<Array<organizations>> => {
  return await prisma.$queryRaw`
      SELECT *
      FROM organizations
      WHERE similarity(name, ${searchTerm}) > ${similarityThreshold}
         OR similarity(tax_id, ${searchTerm}) > ${similarityThreshold}
         OR name ILIKE ${`%${searchTerm}%`}
         OR tax_id ILIKE ${`%${searchTerm}%`}
      ORDER BY
          GREATEST(
          similarity(name, ${searchTerm}),
          similarity(tax_id, ${searchTerm})
          ) DESC
          LIMIT ${pageSize}
  `;
};

export const OrganizationRepository = {
  getOrganizations,
  searchOrganizations,
};
