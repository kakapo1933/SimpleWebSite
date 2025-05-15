import { Organization } from 'common';

export type IGetOrganizationsQueryParams = {
  limit?: number;
  offset?: number;
};

export type ISearchOrganizationsQueryParams = {
  searchTerm: string;
  similarityThreshold?: number;
  limit?: number;
  offset?: number;
};

export interface IUseOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
}

export interface IUseSearchOrganizationsResult {
  organizations: Organization[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}
