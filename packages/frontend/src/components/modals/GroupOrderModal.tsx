import React from 'react';
import { beverageApiService } from '../../services/beverage-api';

interface GroupOrderModalProps {
  show: boolean;
  onClose: () => void;
  groupOrderName: string;
  setGroupOrderName: React.Dispatch<React.SetStateAction<string>>;
  creatorName: string;
  setCreatorName: React.Dispatch<React.SetStateAction<string>>;
  groupOrderCode: string;
  setGroupOrderCode: React.Dispatch<React.SetStateAction<string>>;
  joinGroupOrderCode: string;
  setJoinGroupOrderCode: React.Dispatch<React.SetStateAction<string>>;
}

const GroupOrderModal: React.FC<GroupOrderModalProps> = ({
  show,
  onClose,
  groupOrderName,
  setGroupOrderName,
  creatorName,
  setCreatorName,
  groupOrderCode,
  setGroupOrderCode,
  joinGroupOrderCode,
  setJoinGroupOrderCode,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Group Order</h2>
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
          {groupOrderCode ? (
            <div>
              <div className="mb-4 text-center">
                <h3 className="font-bold text-lg mb-2">Share this code with your friends</h3>
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                  <span className="text-xl font-mono font-bold">{groupOrderCode}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Share this code with your friends so they can join your group order. Once everyone has added their items, you can place the order.
              </p>

              <button
                className="w-full bg-red-600 text-white py-2 rounded-lg"
                onClick={() => {
                  // Close the modal
                  onClose();
                  // Reset the group order code
                  setGroupOrderCode('');
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h3 className="font-bold mb-2">Create a Group Order</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Group Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="e.g., Office Lunch"
                      value={groupOrderName}
                      onChange={(e) => setGroupOrderName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="e.g., John"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-red-600 text-white py-2 rounded-lg mt-4"
                  onClick={async () => {
                    if (!groupOrderName || !creatorName) {
                      alert('Please fill in all fields');
                      return;
                    }

                    try {
                      const response = await beverageApiService.createGroupOrder({
                        name: groupOrderName,
                        creatorName,
                      });

                      if (response.success && response.data) {
                        setGroupOrderCode(response.data.shareCode);
                      }
                    } catch (err) {
                      console.error('Error creating group order:', err);
                      alert('Failed to create group order. Please try again.');
                    }
                  }}
                >
                  Create Group Order
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold mb-2">Join a Group Order</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Group Code</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Enter group code"
                      value={joinGroupOrderCode}
                      onChange={(e) => setJoinGroupOrderCode(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>

                <button
                  className="w-full bg-red-600 text-white py-2 rounded-lg mt-4"
                  onClick={async () => {
                    if (!joinGroupOrderCode) {
                      alert('Please enter a group code');
                      return;
                    }

                    try {
                      const response = await beverageApiService.getGroupOrderByCode(joinGroupOrderCode);

                      if (response.success && response.data) {
                        // Handle joining group order
                        alert(`Joined group order: ${response.data.name}`);
                        onClose();
                      }
                    } catch (err) {
                      console.error('Error joining group order:', err);
                      alert('Failed to join group order. Please check the code and try again.');
                    }
                  }}
                >
                  Join Group Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupOrderModal;