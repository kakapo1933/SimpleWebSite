import { useCallback, useEffect, useState } from 'react';
import { Organization } from 'common';
import { apiService } from '../services/api';
import { GetOrganizationsQueryParams, UseOrganizationsResult } from '../types';

export const useFetchOrganizations = (limit?: number, offset?: number): UseOrganizationsResult => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrganizations = useCallback(
    async (abortController: AbortController, isActive: boolean) => {
      setLoading(true);

      const queryParams: GetOrganizationsQueryParams = {};
      if (limit) queryParams.limit = limit;
      if (offset) queryParams.offset = offset;

      try {
        const response = await apiService.getOrganizations(queryParams, abortController.signal);
        if (!isActive) return;
        setOrganizations(response.data);
        setLoading(false);
      } catch (err) {
        if (!isActive) return;
        const error = err instanceof Error ? err : new Error('Failed to fetch organizations');
        console.error('Failed to fetch organizations', error);
      }
    },
    [limit, offset]
  );

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();

    fetchOrganizations(abortController, isActive).catch(err => {
      console.error('Failed to fetch organizations', err);
    });

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, [fetchOrganizations]);

  return {
    organizations,
    loading,
  };
};
