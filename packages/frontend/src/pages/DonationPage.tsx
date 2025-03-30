import React, { useEffect, useState } from 'react';
import { Organization } from 'common';
import { SearchBar } from '../components/common/SearchBar';
import { List, ListContent } from '../components/common/List';
import { useFetchOrganizations } from "../hooks/useFetchOrganizations.ts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.tsx";
import { Card } from "../components/common/Card.tsx";
import { useSearchOrganizations } from "../hooks/useSearchOrganizations.tsx";
import { DonationModal } from "../components/modals/DonationModal";
import { donationService, DonationRequest } from "../services/donationService";
import { toast } from 'react-hot-toast';

const DonationPage: React.FC = () => {
  const PAGE_SIZE = 10;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [items, setItems] = useState<ListContent[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<ListContent[]>([]);

  // Donation modal state
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    organizations,
    loading,
  } = useFetchOrganizations(PAGE_SIZE, page * PAGE_SIZE)

  // Using the updated useSearchOrganizations hook with infinite scrolling
  const {
    organizations: searchResults,
    loading: searchLoading,
    hasMore: searchHasMore,
    loadMore: loadMoreSearchResults
  } = useSearchOrganizations(searchQuery, undefined, PAGE_SIZE, isSearching ? page * PAGE_SIZE : 0)

  // Handle loading more items based on whether we're searching or not
  const handleLoadMore = () => {
    if (isSearching) {
      if (!searchHasMore) return;
      loadMoreSearchResults();
      setPage(prevPage => prevPage + 1);
    } else {
      if (!hasMore) return;
      setPage(prevPage => prevPage + 1);
    }
  }

  // Handle opening the donation modal
  const handleOpenDonationModal = (item: ListContent) => {
    // Find the full organization object from either the regular or search results
    const orgList = isSearching ? searchResults : organizations;
    const org = orgList.find(o => o.id.toString() === item.id.toString());

    if (org) {
      setSelectedOrganization(org);
      setIsModalOpen(true);
    } else {
      console.error('Organization not found:', item.id);
    }
  }

  // Handle donation submission
  const handleDonateSubmit = async (amount: number, donorInfo: any) => {
    if (!selectedOrganization) return;

    try {
      const donationRequest: DonationRequest = {
        organizationId: selectedOrganization.id,
        amount,
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        paymentMethod: donorInfo.paymentMethod
      };

      const response = await donationService.createDonation(donationRequest);

      // Show success message
      toast.success(`Thank you for your donation of $${amount} to ${selectedOrganization.name}!`);

      return response;
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to process donation. Please try again.');
      throw error;
    }
  }

  // Use the infinite scroll hook with our handleLoadMore function
  const loaderRef = useInfiniteScroll(handleLoadMore);

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

  return (
    <div className="flex flex-col max-w-md w-full h-full bg-slate-100 overflow-hidden">
      <div className="flex justify-center items-center h-15 bg-white shadow-md flex-shrink-0">
        <SearchBar onSearch={setSearchQuery} getClick={setIsSearching}/>
      </div>
      <div className='flex-1 overflow-hidden'>
        {!isSearching ? (
          <List
            items={items}
            loading={loading}
            ItemComponent={(props) => <Card {...props} onDonate={handleOpenDonationModal} />}
          >
            <div ref={loaderRef} className="flex py-4 justify-center w-full">
              {loading ? 'Loading...' : hasMore ? 'Scroll down to load more' : 'No more organizations to load'}
            </div>
          </List>
        ) : (
          <List
            items={searchItems}
            loading={searchLoading}
            ItemComponent={(props) => <Card {...props} onDonate={handleOpenDonationModal} />}
          >
            <div ref={loaderRef} className="flex py-4 justify-center w-full">
              {searchLoading ? 'Loading...' : searchHasMore ? 'Scroll down to load more' : 'No more organizations to load'}
            </div>
          </List>
        )}
      </div>
    </div>
  );
};

export { DonationPage };