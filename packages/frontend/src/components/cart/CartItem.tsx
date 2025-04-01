import React from 'react';
import { CartItem as CartItemType } from '../../types/beverage.types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => Promise<void>;
  isLoading: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, isLoading }) => {
  return (
    <div className="border-b py-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{item.beverage?.name}</h3>
          <p className="text-sm text-slate-950">Qty: {item.quantity}</p>
          {item.customizations && item.customizations.length > 0 && (
            <div className="mt-1">
              <p className="text-xs text-slate-950">Customizations:</p>
              <ul className="text-xs text-slate-950 ml-2">
                {item.customizations.map((customization, index) => (
                  <li key={index}>
                    {customization.name}: {customization.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.notes && (
            <p className="text-xs text-slate-950 mt-1">Notes: {item.notes}</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="font-bold">
            ${((item.beverage?.price || 0) * item.quantity).toFixed(2)}
          </span>
          <button
            className="text-teal-400 text-sm mt-2"
            onClick={() => onRemove(item.id)}
            disabled={isLoading}
          >
            {isLoading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};