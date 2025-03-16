import { Organization } from "common";

export type GetOrganizationsQueryParams = {
  limit?: number;
  offset?: number;
};

export type SearchOrganizationsQueryParams = {
  searchTerm: string;
  similarityThreshold?: number;
  limit?: number;
};

export interface UseOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
}

export interface UseSearchOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
}