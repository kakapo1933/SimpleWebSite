import React from 'react';
import { Beverage, SelectedCustomization } from '../../types/beverage.types';

interface CustomizationModalProps {
  show: boolean;
  onClose: () => void;
  selectedBeverage: Beverage | null;
  selectedCustomizations: SelectedCustomization[];
  setSelectedCustomizations: React.Dispatch<React.SetStateAction<SelectedCustomization[]>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  onAddToCart: () => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  show,
  onClose,
  selectedBeverage,
  selectedCustomizations,
  setSelectedCustomizations,
  quantity,
  setQuantity,
  notes,
  setNotes,
  onAddToCart,
}) => {
  if (!show || !selectedBeverage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-md my-4 sm:my-8 flex flex-col max-h-[90vh]">
        <div className="p-3 sm:p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold truncate pr-2">Customize Your Order</h2>
            <button className="text-slate-600 hover:text-slate-900 flex-shrink-0" onClick={onClose}>
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

        <div className="p-3 sm:p-4 overflow-y-auto flex-grow">
          <div className="mb-3 sm:mb-4">
            <h3 className="font-bold text-lg truncate">{selectedBeverage.name}</h3>
            <p className="text-slate-950">{selectedBeverage.description}</p>
            <p className="font-bold text-teal-400 mt-1">
              ${Number(selectedBeverage.price).toFixed(2)}
            </p>
          </div>

          {selectedBeverage.customizations && selectedBeverage.customizations.length > 0 && (
            <div className="mb-4">
              <h4 className="font-bold mb-2">Customizations</h4>
              {selectedBeverage.customizations.map(customization => (
                <div key={customization.id} className="mb-3">
                  <p className="font-medium mb-1">{customization.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {customization.options.map(option => (
                      <button
                        key={option.id}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCustomizations.some(
                            sc => sc.name === customization.name && sc.value === option.name
                          )
                            ? 'bg-slate-600 text-white'
                            : 'bg-white text-slate-950'
                        }`}
                        onClick={() => {
                          // Remove existing customization with the same name
                          const filteredCustomizations = selectedCustomizations.filter(
                            sc => sc.name !== customization.name
                          );

                          // Add the new customization
                          setSelectedCustomizations([
                            ...filteredCustomizations,
                            { name: customization.name, value: option.name, price: option.price },
                          ]);
                        }}
                      >
                        {option.name} {option.price > 0 ? `+$${option.price.toFixed(2)}` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-4">
            <h4 className="font-bold mb-2">Quantity</h4>
            <div className="flex items-center">
              <button
                className="bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="mx-4 font-bold">{quantity}</span>
              <button
                className="bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold mb-2">Special Instructions</h4>
            <textarea
              className="w-full p-2 border rounded-lg resize-none"
              placeholder="Any special requests?"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              maxLength={200}
            />
          </div>
        </div>

        <div className="p-4 border-t sticky bottom-0 bg-white z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-teal-400">
              $
              {(
                (Number(selectedBeverage.price) +
                  selectedCustomizations.reduce((total, sc) => total + (sc.price || 0), 0)) *
                quantity
              ).toFixed(2)}
            </span>
          </div>

          <button
            className="w-full bg-slate-600 text-white py-3 rounded-lg font-bold"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
