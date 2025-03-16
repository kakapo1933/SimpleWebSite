import { useCallback, useEffect, useState } from 'react';
import { Organization } from 'common';
import { SearchOrganizationsQueryParams, UseSearchOrganizationsResult } from "../types";
import { apiService } from "../services/api.ts";

export const useSearchOrganizations = (searchTerm: string,
  similarityThreshold?: number,
  limit?: number): UseSearchOrganizationsResult => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (abortController: AbortController, isActive: boolean) => {
    setLoading(true);

    const queryParams: SearchOrganizationsQueryParams = { searchTerm: "" };
    if (searchTerm) queryParams.searchTerm = searchTerm;
    if (similarityThreshold) queryParams.similarityThreshold = similarityThreshold
    if (limit) queryParams.limit = limit;

    try {
      const response = await apiService.searchOrganizations({
        searchTerm,
        similarityThreshold,
        limit,
      }, abortController.signal);
      if (!isActive) return;
      console.log(response);
      setOrganizations(response.data);
      setLoading(false);
    }
    catch (err) {
      if (!isActive) return;
      const error = err instanceof Error ? err.message : 'Failed to fetch organizations';
      console.log('Failed to find matched organizations', error);
    }
  }, [searchTerm, similarityThreshold, limit]);

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    fetchData(abortController, isActive).catch(console.error);

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [fetchData]);

  return {
    organizations,
    loading,
  };
};