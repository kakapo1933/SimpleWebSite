import React, { useEffect, useState } from 'react';
import { Organization } from 'common';
import { SearchBar } from '../components/common/SearchBar';
import { List, ListContent } from '../components/common/List';
import { useFetchOrganizations } from '../hooks/useFetchOrganizations.ts';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll.tsx';
import { Card } from '../components/common/Card.tsx';
import { useSearchOrganizations } from '../hooks/useSearchOrganizations.tsx';
import { DonationModal } from '../components/modals/DonationModal';
import { donationService, DonationRequest } from '../services/donationService';
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

  const { organizations, loading } = useFetchOrganizations(PAGE_SIZE, page * PAGE_SIZE);

  // Using the updated useSearchOrganizations hook with infinite scrolling
  const {
    organizations: searchResults,
    loading: searchLoading,
    hasMore: searchHasMore,
    loadMore: loadMoreSearchResults,
  } = useSearchOrganizations(searchQuery, undefined, PAGE_SIZE, isSearching ? page * PAGE_SIZE : 0);

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
  };

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
  };

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
        paymentMethod: donorInfo.paymentMethod,
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
  };

  // Use the infinite scroll hook with our handleLoadMore function
  const loaderRef = useInfiniteScroll(handleLoadMore);

  useEffect(() => {
    if (organizations.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setItems(preItems => [
      ...preItems,
      ...organizations.map(org => ({
        id: org.id.toString() ?? 'XXXX999999',
        name: org.name,
        type: org.organization_type ?? '',
        link: org.website ?? '',
      })),
    ]);
  }, [organizations]);

  useEffect(() => {
    if (searchResults.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setSearchItems(
      searchResults.map(org => ({
        id: org.id.toString() ?? 'XXXX8888888',
        name: org.name,
        type: org.organization_type ?? '',
        link: org.website ?? '',
      }))
    );
  }, [searchResults]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="bg-slate-600 text-white p-4 fixed top-0 left-0 right-0 z-20 shadow-lg">
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4">
          <h1 className="text-xl font-bold truncate">Donation Platform</h1>
        </div>
      </header>

      <div className="pt-20 flex flex-col flex-grow w-full">
        <div className="bg-white shadow-md p-4 mb-4">
          <div className="max-w-6xl mx-auto">
            <SearchBar onSearch={setSearchQuery} getClick={setIsSearching} />
          </div>
        </div>

        <main className="flex-grow pb-14">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
              {!isSearching ? (
                items.length > 0 ? (
                  items.map(item => (
                    <Card key={item.id} item={item} onDonate={handleOpenDonationModal} />
                  ))
                ) : loading ? (
                  <div className="col-span-full flex justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
                  </div>
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-slate-950">No organizations found</p>
                  </div>
                )
              ) : searchItems.length > 0 ? (
                searchItems.map(item => (
                  <Card key={item.id} item={item} onDonate={handleOpenDonationModal} />
                ))
              ) : searchLoading ? (
                <div className="col-span-full flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
                </div>
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-slate-950">No organizations found matching your search</p>
                </div>
              )}
            </div>

            <div ref={loaderRef} className="flex py-6 justify-center w-full">
              {(!isSearching && loading) || (isSearching && searchLoading) ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400"></div>
              ) : (!isSearching && hasMore) || (isSearching && searchHasMore) ? (
                <p className="text-gray-500 text-sm">Scroll down to load more</p>
              ) : items.length > 0 || searchItems.length > 0 ? (
                <p className="text-gray-500 text-sm">No more organizations to load</p>
              ) : (
                <p className="text-gray-500 text-sm">No organizations found</p>
              )}
            </div>
          </div>
        </main>
      </div>

      <DonationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        organization={selectedOrganization}
        onDonateSubmit={handleDonateSubmit}
      />
    </div>
  );
};

export { DonationPage };
