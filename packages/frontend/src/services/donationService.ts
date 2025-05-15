import { apiService } from './api';

export interface DonationRequest {
  organizationId: number;
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  paymentMethod: string;
}

export interface DonationResponse {
  id: number;
  organizationId: number;
  amount: number;
  donorName: string;
  donorEmail: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
}

// This is a mock implementation since we don't have a real backend for donations yet
export const donationService = {
  /**
   * Create a new donation
   * @param donation The donation data
   * @returns A promise that resolves to the created donation
   */
  createDonation: async (donation: DonationRequest): Promise<DonationResponse> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock successful response
    return {
      id: Math.floor(Math.random() * 1000),
      organizationId: donation.organizationId,
      amount: donation.amount,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      paymentStatus: 'completed',
      transactionId: `txn_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // In a real implementation, we would call the API:
    // return await apiService.post('/api/v1/donations', donation);
  },

  /**
   * Get a donation by ID
   * @param id The donation ID
   * @returns A promise that resolves to the donation
   */
  getDonation: async (id: number): Promise<DonationResponse> => {
    // This would be implemented when we have a real backend
    throw new Error('Not implemented');

    // In a real implementation:
    // return await apiService.get(`/api/v1/donations/${id}`);
  },

  /**
   * Get all donations for an organization
   * @param organizationId The organization ID
   * @returns A promise that resolves to an array of donations
   */
  getOrganizationDonations: async (organizationId: number): Promise<DonationResponse[]> => {
    // This would be implemented when we have a real backend
    throw new Error('Not implemented');

    // In a real implementation:
    // return await apiService.get(`/api/v1/organizations/${organizationId}/donations`);
  },
};
