import React, { useEffect, useState } from 'react';
import { beverageApiService } from '../services/beverage-api';
import {
  Beverage,
  BeverageCategory,
  CartItem,
  SelectedCustomization,
} from '../types/beverage.types';
import { useTranslation } from 'react-i18next';
import CartModal from '../components/modals/CartModal';
import GroupOrderModal from '../components/modals/GroupOrderModal';
import CustomizationModal from '../components/modals/CustomizationModal';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const BeveragePage: React.FC = () => {
  const { t } = useTranslation();

  // State for data
  const [categories, setCategories] = useState<BeverageCategory[]>([]);
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showPopular, setShowPopular] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const PAGE_SIZE = 10;
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

  // State for UI
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCustomization, setShowCustomization] = useState<boolean>(false);
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage | null>(null);
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [showGroupOrderModal, setShowGroupOrderModal] = useState<boolean>(false);
  const [groupOrderName, setGroupOrderName] = useState<string>('');
  const [creatorName, setCreatorName] = useState<string>('');
  const [groupOrderCode, setGroupOrderCode] = useState<string>('');
  const [joinGroupOrderCode, setJoinGroupOrderCode] = useState<string>('');

  // Load categories and beverages on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesResponse = await beverageApiService.getBeverageCategories();
        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        // Fetch beverages with pagination
        const beveragesResponse = await beverageApiService.getBeverages({
          limit: PAGE_SIZE,
          offset: 0
        });
        if (beveragesResponse.success && beveragesResponse.data) {
          setBeverages(beveragesResponse.data);
          // If we got fewer items than the page size, there are no more items
          setHasMore(beveragesResponse.data.length === PAGE_SIZE);
        }

        // Fetch cart items
        const cartResponse = await beverageApiService.getCartItems();
        if (cartResponse.success && cartResponse.data) {
          setCartItems(cartResponse.data);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData().catch(err => {
      console.error('Error fetching data:', err);
    });
  }, []);

  // Filter beverages when filters change
  useEffect(() => {
    const fetchFilteredBeverages = async () => {
      try {
        setLoading(true);
        // Reset pagination when filters change
        setPage(0);
        setBeverages([]);
        setHasMore(true);

        const params = {
          categoryId: selectedCategory || undefined,
          popular: showPopular || undefined,
          new: showNew || undefined,
          limit: PAGE_SIZE,
          offset: 0
        };

        const response = await beverageApiService.getBeverages(params);
        if (response.success && response.data) {
          setBeverages(response.data);
          setHasMore(response.data.length === PAGE_SIZE);
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to filter beverages. Please try again later.');
        setLoading(false);
        console.error('Error filtering beverages:', err);
      }
    };

    fetchFilteredBeverages().catch(err => {
      console.error('Error filtering beverages:', err);
    });
  }, [selectedCategory, showPopular, showNew]);

  // Handle loading more beverages
  const handleLoadMore = async () => {
    if (!hasMore || paginationLoading) return;

    try {
      setPaginationLoading(true);
      const nextPage = page + 1;

      const params = {
        categoryId: selectedCategory || undefined,
        popular: showPopular || undefined,
        new: showNew || undefined,
        limit: PAGE_SIZE,
        offset: nextPage * PAGE_SIZE
      };

      const response = await beverageApiService.getBeverages(params);
      if (response.success && response.data) {
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setBeverages(prev => [...prev, ...response.data]);
          setPage(nextPage);
          setHasMore(response.data.length === PAGE_SIZE);
        }
      }

      setPaginationLoading(false);
    } catch (err) {
      console.error('Error loading more beverages:', err);
      setPaginationLoading(false);
    }
  };

  // Use infinite scroll hook
  const loaderRef = useInfiniteScroll(handleLoadMore);

  // Handle category selection
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  // Handle filter toggles
  const handleTogglePopular = () => {
    setShowPopular(!showPopular);
  };

  const handleToggleNew = () => {
    setShowNew(!showNew);
  };

  // Handle beverage selection for customization
  const handleSelectBeverage = (beverage: Beverage) => {
    setSelectedBeverage(beverage);
    setSelectedCustomizations([]);
    setQuantity(1);
    setNotes('');
    setShowCustomization(true);
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedBeverage) return;

    try {
      const response = await beverageApiService.addToCart(
        selectedBeverage.id,
        quantity,
        selectedCustomizations.length > 0 ? selectedCustomizations : undefined,
        notes || undefined
      );

      if (response.success) {
        // Refresh cart items
        const cartResponse = await beverageApiService.getCartItems();
        if (cartResponse.success && cartResponse.data) {
          setCartItems(cartResponse.data);
        }

        // Close customization modal
        setShowCustomization(false);

        // Show cart
        setShowCart(true);
      }
    } catch (err) {
      setError('Failed to add item to cart. Please try again later.');
      console.error('Error adding to cart:', err);
    }
  };

  // Handle cart update
  const handleCartUpdate = async () => {
    try {
      const cartResponse = await beverageApiService.getCartItems();
      if (cartResponse.success && cartResponse.data) {
        setCartItems(cartResponse.data);
      }
    } catch (err) {
      console.error('Error updating cart items:', err);
    }
  };

  // Render loading state
  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Render error state
  if (error && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()}
        >
          {t('tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="bg-red-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <h1 className="text-xl font-bold">Beverage Ordering</h1>
          <div className="flex items-center space-x-4">
            <button
              className="relative"
              onClick={() => setShowCart(!showCart)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              className="text-sm"
              onClick={() => setShowGroupOrderModal(true)}
            >
              Group Order
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-md mx-auto w-full overflow-hidden">
        {/* Categories */}
        <div className="mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 pb-2 min-w-max">
              <button
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === null ? 'bg-red-600 text-white' : 'bg-white text-gray-800'
                }`}
                onClick={() => handleCategorySelect(null)}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id ? 'bg-red-600 text-white' : 'bg-white text-gray-800'
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              showPopular ? 'bg-red-600 text-white' : 'bg-white text-gray-800'
            }`}
            onClick={handleTogglePopular}
          >
            Popular
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              showNew ? 'bg-red-600 text-white' : 'bg-white text-gray-800'
            }`}
            onClick={handleToggleNew}
          >
            New
          </button>
        </div>

        {/* Beverages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden">
          {beverages.map((beverage) => (
            <div
              key={beverage.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSelectBeverage(beverage)}
            >
              <div className="h-40 bg-gray-200">
                {beverage.imageUrl ? (
                  <img
                    src={beverage.imageUrl}
                    alt={beverage.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{beverage.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2 overflow-hidden">{beverage.description}</p>
                <div className="flex justify-between items-center overflow-hidden">
                  {/* Ensure price is a number before calling toFixed() to prevent "toFixed is not a function" error */}
                  <span className="font-bold text-red-600">${(Number(beverage.price)).toFixed(2)}</span>
                  <div className="flex space-x-2 flex-shrink-0">
                    {beverage.isPopular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Popular</span>
                    )}
                    {beverage.isNew && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">New</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="flex py-4 justify-center w-full mt-4">
          {paginationLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
          ) : hasMore ? (
            <p className="text-gray-500 text-sm">Scroll down to load more</p>
          ) : beverages.length > 0 ? (
            <p className="text-gray-500 text-sm">No more beverages to load</p>
          ) : (
            <p className="text-gray-500 text-sm">No beverages found</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center overflow-hidden">
        <p>© 2023 Beverage Ordering App</p>
      </footer>

      {/* Cart Modal */}
      <CartModal
        show={showCart}
        onClose={() => setShowCart(false)}
        onCartUpdate={handleCartUpdate}
      />
      {/* Group Order Modal */}
      <GroupOrderModal
        show={showGroupOrderModal}
        onClose={() => setShowGroupOrderModal(false)}
        groupOrderName={groupOrderName}
        setGroupOrderName={setGroupOrderName}
        creatorName={creatorName}
        setCreatorName={setCreatorName}
        groupOrderCode={groupOrderCode}
        setGroupOrderCode={setGroupOrderCode}
        joinGroupOrderCode={joinGroupOrderCode}
        setJoinGroupOrderCode={setJoinGroupOrderCode}
      />

      {/* Customization Modal */}
      <CustomizationModal
        show={showCustomization}
        onClose={() => setShowCustomization(false)}
        selectedBeverage={selectedBeverage}
        selectedCustomizations={selectedCustomizations}
        setSelectedCustomizations={setSelectedCustomizations}
        quantity={quantity}
        setQuantity={setQuantity}
        notes={notes}
        setNotes={setNotes}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default BeveragePage;