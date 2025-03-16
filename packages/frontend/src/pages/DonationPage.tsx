import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { List, ListContent } from '../components/common/List';
import { useFetchOrganizations } from "../hooks/useFetchOrganizations.ts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.tsx";
import { Card } from "../components/common/Card.tsx";
import { useSearchOrganizations } from "../hooks/useSearchOrganizations.tsx";

const DonationPage: React.FC = () => {
  const PAGE_SIZE = 10;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [items, setItems] = useState<ListContent[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<ListContent[]>([])

  const {
    organizations,
    loading,
  } = useFetchOrganizations(PAGE_SIZE, page * PAGE_SIZE)

  // TODO Prevent the API request from useSearchOrganizations on initialization
  const {
    organizations: searchResults,
    loading: searchLoading,
  } = useSearchOrganizations(searchQuery)

  const loadMore = () => {
    if (!hasMore) return;
    setPage(prevPage => prevPage + 1);
  }

  //TODO Add infinite scroll for search results

  const loaderRef = useInfiniteScroll(loadMore);

  useEffect(() => {
    if (organizations.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setItems(preItems => ([...preItems, ...organizations.map(org => ({
      id: org.id.toString() ?? 'XXXX999999',
      name: org.name,
      type: org.organization_type ?? '',
      link: org.website ?? '',
    }))]))
  }, [organizations])

  useEffect(() => {
    if (searchResults.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setSearchItems(searchResults.map(org => ({
      id: org.id.toString() ?? 'XXXX8888888',
      name: org.name,
      type: org.organization_type ?? '',
      link: org.website ?? '',
    })))
  }, [searchResults]);

  return (<div className="flex flex-col max-w-md w-full h-full bg-gray-50">
    <div className="flex justify-center items-center h-15 bg-white shadow-md">
      <SearchBar onSearch={setSearchQuery} getClick={setIsSearching}/>
    </div>
    <div className='flex flex-col justify-start items-center h-full overflow-y-scroll'>
      {!isSearching ? (<List
        items={items}
        loading={loading}
        ItemComponent={Card}
      >
        <div ref={loaderRef} className="flex py-4">
          {loading ? 'Loading...' : 'Scroll down to load more'}
        </div>
      </List>) : (<List
        items={searchItems}
        loading={searchLoading}
        ItemComponent={Card}
      >
        <div ref={loaderRef} className="flex py-4">
          {loading ? 'Loading...' : 'Scroll down to load more'}
        </div>
      </List>)}
    </div>
  </div>);
};

export { DonationPage };