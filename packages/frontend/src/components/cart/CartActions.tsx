import React from 'react';

interface CartActionsProps {
  onClearCart: () => Promise<void>;
  onCheckout: () => void;
  onContinueShopping?: () => void;
  isLoading: boolean;
}

export const CartActions: React.FC<CartActionsProps> = ({
  onClearCart,
  onCheckout,
  onContinueShopping,
  isLoading,
}) => {
  return (
    <div className="mt-6 space-y-2">
      <div className="flex space-x-2">
        <button
          className="flex-1 bg-white text-slate-950 py-2 rounded-lg disabled:opacity-50"
          onClick={onClearCart}
          disabled={isLoading}
        >
          {isLoading ? 'Clearing...' : 'Clear Cart'}
        </button>
        <button
          className="flex-1 bg-slate-600 text-white py-2 rounded-lg disabled:opacity-50"
          onClick={onCheckout}
          disabled={isLoading}
        >
          Checkout
        </button>
      </div>
      {onContinueShopping && (
        <button
          className="w-full bg-slate-900 text-white py-2 rounded-lg disabled:opacity-50"
          onClick={onContinueShopping}
          disabled={isLoading}
        >
          Continue Shopping
        </button>
      )}
    </div>
  );
};
