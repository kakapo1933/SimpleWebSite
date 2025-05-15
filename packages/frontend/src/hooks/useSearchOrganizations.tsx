import { useCallback, useEffect, useState } from 'react';
import { Organization } from 'common';
import { SearchOrganizationsQueryParams, UseSearchOrganizationsResult } from '../types';
import { apiService } from '../services/api.ts';

export const useSearchOrganizations = (
  searchTerm: string,
  similarityThreshold?: number,
  limit?: number,
  offset?: number
): UseSearchOrganizationsResult => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = useCallback(
    async (abortController: AbortController, isActive: boolean, isLoadingMore: boolean = false) => {
      setLoading(true);

      const queryParams: SearchOrganizationsQueryParams = { searchTerm: '' };
      if (searchTerm) queryParams.searchTerm = searchTerm;
      if (similarityThreshold) queryParams.similarityThreshold = similarityThreshold;
      if (limit) queryParams.limit = limit;
      if (offset !== undefined) queryParams.offset = offset;

      try {
        const response = await apiService.searchOrganizations(
          {
            searchTerm,
            similarityThreshold,
            limit,
            offset,
          },
          abortController.signal
        );

        if (!isActive) return;

        // Check if there are more results to load
        if (response.data.length < (limit || 10)) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        // If loading more, append to existing results, otherwise replace
        if (isLoadingMore) {
          setOrganizations(prev => [...prev, ...response.data]);
        } else {
          setOrganizations(response.data);
        }

        setLoading(false);
      } catch (err) {
        if (!isActive) return;
        const error = err instanceof Error ? err.message : 'Failed to fetch organizations';
        console.log('Failed to find matched organizations', error);
        setLoading(false);
      }
    },
    [searchTerm, similarityThreshold, limit, offset]
  );

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    // Only fetch data if searchTerm is not empty
    if (searchTerm && searchTerm.trim() !== '') {
      fetchData(abortController, isActive).catch(console.error);
    } else {
      // Reset organizations when search term is empty
      setOrganizations([]);
      setLoading(false);
    }

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [fetchData, searchTerm]);

  // Function to load more results
  const loadMore = useCallback(() => {
    if (!loading && hasMore && searchTerm && searchTerm.trim() !== '') {
      const newOffset = (offset || 0) + (limit || 10);
      const abortController = new AbortController();

      // Create a new fetch function with the updated offset
      const fetchMoreData = async () => {
        try {
          const response = await apiService.searchOrganizations(
            {
              searchTerm,
              similarityThreshold,
              limit,
              offset: newOffset,
            },
            abortController.signal
          );

          // Check if there are more results to load
          if (response.data.length < (limit || 10)) {
            setHasMore(false);
          }

          // Append new results to existing ones
          setOrganizations(prev => [...prev, ...response.data]);
          setLoading(false);
        } catch (err) {
          const error = err instanceof Error ? err.message : 'Failed to fetch more organizations';
          console.log('Failed to find more matched organizations', error);
          setLoading(false);
        }
      };

      setLoading(true);
      fetchMoreData();
    }
  }, [loading, hasMore, searchTerm, offset, limit, similarityThreshold]);

  return {
    organizations,
    loading,
    hasMore,
    loadMore,
  };
};
