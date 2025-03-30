import React, { useState } from 'react';
import { Organization } from 'common';

interface DonationModalProps {
  organization: Organization | null;
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, donorInfo: DonorInfo) => Promise<void>;
}

interface DonorInfo {
  name: string;
  email: string;
  phone?: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
}

const DONATION_AMOUNTS = [10, 25, 50, 100, 250];

export const DonationModal: React.FC<DonationModalProps> = ({
  organization,
  isOpen,
  onClose,
  onDonate
}) => {
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'bank_transfer'>('credit_card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !organization) return null;

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
      if (value) {
        setAmount(parseFloat(value));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!donorName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!donorEmail.trim() || !/\S+@\S+\.\S+/.test(donorEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!amount || amount <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onDonate(amount, {
        name: donorName,
        email: donorEmail,
        phone: donorPhone || undefined,
        paymentMethod
      });

      // Reset form
      setAmount(25);
      setCustomAmount('');
      setDonorName('');
      setDonorEmail('');
      setDonorPhone('');
      setPaymentMethod('credit_card');

      // Close modal
      onClose();
    } catch (err) {
      setError('An error occurred while processing your donation. Please try again.');
      console.error('Donation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Donate to {organization.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Select Donation Amount
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {DONATION_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`py-2 px-4 rounded-md ${
                      amount === amt && !customAmount
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                    onClick={() => handleAmountSelect(amt)}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                    $
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`py-2 px-4 rounded-md ${
                    paymentMethod === 'credit_card'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-md ${
                    paymentMethod === 'paypal'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  className={`py-2 px-4 rounded-md ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('bank_transfer')}
                >
                  Bank Transfer
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Donate $${amount || 0}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};