export interface GetOrganizationQuery {
  limit?: string;
  offset?: string;
}

export interface SearchOrganizationsQuery {
  searchTerm?: string;
  similarityThreshold?: string;
  limit?: string;
}