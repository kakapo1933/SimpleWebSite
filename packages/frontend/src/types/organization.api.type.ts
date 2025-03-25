import { Organization } from "common";

export type GetOrganizationsQueryParams = {
  limit?: number;
  offset?: number;
};

export type SearchOrganizationsQueryParams = {
  searchTerm: string;
  similarityThreshold?: number;
  limit?: number;
  offset?: number;
};

export interface UseOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
}

export interface UseSearchOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}