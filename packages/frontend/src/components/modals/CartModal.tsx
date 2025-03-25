import React from 'react';
import { CartItem } from '../../types/beverage.types';
import { beverageApiService } from '../../services/beverage-api';

interface CartModalProps {
  show: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartModal: React.FC<CartModalProps> = ({ show, onClose, cartItems, setCartItems }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="border-b py-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold">{item.beverage?.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">Customizations:</p>
                          <ul className="text-xs text-gray-600 ml-2">
                            {item.customizations.map((customization, index) => (
                              <li key={index}>
                                {customization.name}: {customization.value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.notes && (
                        <p className="text-xs text-gray-600 mt-1">Notes: {item.notes}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold">
                        ${((item.beverage?.price || 0) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="text-red-600 text-sm mt-2"
                        onClick={async () => {
                          try {
                            const response = await beverageApiService.removeFromCart(item.id);
                            if (response.success) {
                              const cartResponse = await beverageApiService.getCartItems();
                              if (cartResponse.success && cartResponse.data) {
                                setCartItems(cartResponse.data);
                              }
                            }
                          } catch (err) {
                            console.error('Error removing item from cart:', err);
                          }
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    ${cartItems.reduce((total, item) => total + (item.beverage?.price || 0) * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                  onClick={async () => {
                    try {
                      const response = await beverageApiService.clearCart();
                      if (response.success) {
                        setCartItems([]);
                      }
                    } catch (err) {
                      console.error('Error clearing cart:', err);
                    }
                  }}
                >
                  Clear Cart
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                  onClick={() => {
                    // Implement checkout functionality
                    alert('Checkout functionality would go here');
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;