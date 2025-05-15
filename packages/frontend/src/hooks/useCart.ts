import { useState, useCallback } from 'react';
import { beverageApiService } from '../services/beverage-api';
import { CartItem } from '../types/beverage.types';

interface UseCartReturn {
  cartItems: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCartItems: () => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await beverageApiService.getCartItems();
      if (response.success && response.data) {
        setCartItems(response.data);
      } else {
        setError(response.message || 'Failed to fetch cart items');
      }
    } catch (err) {
      setError('An error occurred while fetching cart items');
      console.error('Error fetching cart items:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(
    async (itemId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await beverageApiService.removeFromCart(itemId);
        if (response.success) {
          await fetchCartItems();
        } else {
          setError(response.message || 'Failed to remove item from cart');
        }
      } catch (err) {
        setError('An error occurred while removing item from cart');
        console.error('Error removing item from cart:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCartItems]
  );

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await beverageApiService.clearCart();
      if (response.success) {
        setCartItems([]);
      } else {
        setError(response.message || 'Failed to clear cart');
      }
    } catch (err) {
      setError('An error occurred while clearing cart');
      console.error('Error clearing cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    cartItems,
    isLoading,
    error,
    fetchCartItems,
    removeFromCart,
    clearCart,
  };
};
