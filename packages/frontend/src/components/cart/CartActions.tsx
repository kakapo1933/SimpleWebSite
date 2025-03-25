import React from 'react';

interface CartActionsProps {
  onClearCart: () => Promise<void>;
  onCheckout: () => void;
  isLoading: boolean;
}

export const CartActions: React.FC<CartActionsProps> = ({
  onClearCart,
  onCheckout,
  isLoading
}) => {
  return (
    <div className="mt-6 flex space-x-2">
      <button
        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg disabled:opacity-50"
        onClick={onClearCart}
        disabled={isLoading}
      >
        {isLoading ? 'Clearing...' : 'Clear Cart'}
      </button>
      <button
        className="flex-1 bg-red-600 text-white py-2 rounded-lg disabled:opacity-50"
        onClick={onCheckout}
        disabled={isLoading}
      >
        Checkout
      </button>
    </div>
  );
};