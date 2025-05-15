import React, { useEffect } from 'react';
import { CartItem, CartSummary, CartActions } from '../cart';
import { useCart } from '../../hooks/useCart';

interface CartModalProps {
  show: boolean;
  onClose: () => void;
  onCartUpdate?: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ show, onClose, onCartUpdate }) => {
  const { cartItems, isLoading, error, fetchCartItems, removeFromCart, clearCart } = useCart();

  const handleRemoveFromCart = async (itemId: string) => {
    await removeFromCart(itemId);
    if (onCartUpdate) {
      onCartUpdate();
    }
  };

  const handleClearCart = async () => {
    await clearCart();
    if (onCartUpdate) {
      onCartUpdate();
    }
  };

  useEffect(() => {
    if (show) {
      fetchCartItems();
    }
  }, [show, fetchCartItems]);

  if (!show) return null;

  const handleCheckout = () => {
    // Implement checkout functionality
    alert('Checkout functionality would go here');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-md my-4 sm:my-8 flex flex-col max-h-[90vh]">
        <div className="p-2 sm:p-4 border-t sticky bottom-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold truncate pr-2">Your Cart</h2>
            <button
              className="text-gray-500 hover:text-gray-700 flex-shrink-0"
              onClick={onClose}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-2 sm:p-4 overflow-y-auto flex-grow">
          {isLoading && cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading cart items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button className="mt-2 text-blue-500" onClick={fetchCartItems} disabled={isLoading}>
                Try again
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveFromCart}
                  isLoading={isLoading}
                />
              ))}

              <CartSummary cartItems={cartItems} />

              <CartActions
                onClearCart={handleClearCart}
                onCheckout={handleCheckout}
                onContinueShopping={onClose}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
