import React from 'react';
import { CartItem } from '../../types/beverage.types';

interface CartSummaryProps {
  cartItems: CartItem[];
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.beverage?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};
