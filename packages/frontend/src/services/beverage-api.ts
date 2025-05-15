import { apiRequestV1, buildV1RestApiUrl, fetchJson } from '../utils/http';
import { ApiResponse } from '../types/api.response.type';
import {
  Beverage,
  BeverageCategory,
  BeverageQueryParams,
  CartItem,
  CreateGroupOrderParams,
  CreateOrderParams,
  ExtendGroupOrderParams,
  GroupOrder,
  Order,
} from '../types/beverage.types';

// Generate a unique session ID for the cart
const generateSessionId = (): string => {
  // Check if a session ID already exists in localStorage
  const existingSessionId = localStorage.getItem('cartSessionId');
  if (existingSessionId) {
    return existingSessionId;
  }

  // Generate a new session ID
  const newSessionId =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('cartSessionId', newSessionId);
  return newSessionId;
};

// Beverage Categories
async function getBeverageCategories(signal?: AbortSignal): Promise<ApiResponse<BeverageCategory>> {
  return await apiRequestV1<BeverageCategory>('/beverages/categories', { signal });
}

async function getBeverageCategory(
  id: number,
  signal?: AbortSignal
): Promise<ApiResponse<BeverageCategory>> {
  return await apiRequestV1<BeverageCategory>(`/beverages/categories/${id}`, { signal });
}

// Beverages
async function getBeverages(
  params?: BeverageQueryParams,
  signal?: AbortSignal
): Promise<ApiResponse<Beverage>> {
  return await apiRequestV1<Beverage, BeverageQueryParams>('/beverages', { params, signal });
}

async function getBeverage(id: number, signal?: AbortSignal): Promise<ApiResponse<Beverage>> {
  return await apiRequestV1<Beverage>(`/beverages/${id}`, { signal });
}

// Cart
async function getCartItems(signal?: AbortSignal): Promise<ApiResponse<CartItem>> {
  const sessionId = generateSessionId();
  return await apiRequestV1<CartItem>(`/cart/${sessionId}`, { signal });
}

async function addToCart(
  beverageId: number,
  quantity: number,
  customizations?: SelectedCustomization[],
  notes?: string,
  signal?: AbortSignal
): Promise<ApiResponse<CartItem>> {
  const sessionId = generateSessionId();
  const url = buildV1RestApiUrl(`/cart/${sessionId}`);

  return await fetchJson<ApiResponse<CartItem>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      beverageId,
      quantity,
      customizations,
      notes,
    }),
    signal,
  });
}

async function updateCartItem(
  itemId: string,
  quantity: number,
  customizations?: SelectedCustomization[],
  notes?: string,
  signal?: AbortSignal
): Promise<ApiResponse<CartItem>> {
  const sessionId = generateSessionId();
  const url = buildV1RestApiUrl(`/cart/${sessionId}/${itemId}`);

  return await fetchJson<ApiResponse<CartItem>>(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity,
      customizations,
      notes,
    }),
    signal,
  });
}

async function removeFromCart(
  itemId: string,
  signal?: AbortSignal
): Promise<ApiResponse<{ success: boolean; message: string }>> {
  const sessionId = generateSessionId();
  const url = buildV1RestApiUrl(`/cart/${sessionId}/${itemId}`);

  return await fetchJson<ApiResponse<{ success: boolean; message: string }>>(url, {
    method: 'DELETE',
    signal,
  });
}

async function clearCart(
  signal?: AbortSignal
): Promise<ApiResponse<{ success: boolean; message: string }>> {
  const sessionId = generateSessionId();
  const url = buildV1RestApiUrl(`/cart/${sessionId}`);

  return await fetchJson<ApiResponse<{ success: boolean; message: string }>>(url, {
    method: 'DELETE',
    signal,
  });
}

// Orders
async function createOrder(
  orderData: CreateOrderParams,
  signal?: AbortSignal
): Promise<ApiResponse<Order>> {
  const url = buildV1RestApiUrl('/orders');

  return await fetchJson<ApiResponse<Order>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
    signal,
  });
}

async function getOrder(id: number, signal?: AbortSignal): Promise<ApiResponse<Order>> {
  return await apiRequestV1<Order>(`/orders/${id}`, { signal });
}

async function updateOrderStatus(
  id: number,
  status: string,
  signal?: AbortSignal
): Promise<ApiResponse<Order>> {
  const url = buildV1RestApiUrl(`/orders/${id}/status`);

  return await fetchJson<ApiResponse<Order>>(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
    signal,
  });
}

async function updatePaymentStatus(
  id: number,
  paymentStatus: string,
  paymentMethod?: string,
  signal?: AbortSignal
): Promise<ApiResponse<Order>> {
  const url = buildV1RestApiUrl(`/orders/${id}/payment`);

  return await fetchJson<ApiResponse<Order>>(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentStatus, paymentMethod }),
    signal,
  });
}

// Group Orders
async function createGroupOrder(
  groupOrderData: CreateGroupOrderParams,
  signal?: AbortSignal
): Promise<ApiResponse<GroupOrder>> {
  const url = buildV1RestApiUrl('/group-orders');

  return await fetchJson<ApiResponse<GroupOrder>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupOrderData),
    signal,
  });
}

async function getGroupOrderByCode(
  shareCode: string,
  signal?: AbortSignal
): Promise<ApiResponse<GroupOrder>> {
  return await apiRequestV1<GroupOrder>(`/group-orders/code/${shareCode}`, { signal });
}

async function getGroupOrder(id: number, signal?: AbortSignal): Promise<ApiResponse<GroupOrder>> {
  return await apiRequestV1<GroupOrder>(`/group-orders/${id}`, { signal });
}

async function updateGroupOrderStatus(
  id: number,
  status: string,
  signal?: AbortSignal
): Promise<ApiResponse<GroupOrder>> {
  const url = buildV1RestApiUrl(`/group-orders/${id}/status`);

  return await fetchJson<ApiResponse<GroupOrder>>(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
    signal,
  });
}

async function extendGroupOrder(
  id: number,
  params: ExtendGroupOrderParams,
  signal?: AbortSignal
): Promise<ApiResponse<GroupOrder>> {
  const url = buildV1RestApiUrl(`/group-orders/${id}/extend`);

  return await fetchJson<ApiResponse<GroupOrder>>(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    signal,
  });
}

export const beverageApiService = {
  // Beverage Categories
  getBeverageCategories,
  getBeverageCategory,

  // Beverages
  getBeverages,
  getBeverage,

  // Cart
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,

  // Orders
  createOrder,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,

  // Group Orders
  createGroupOrder,
  getGroupOrderByCode,
  getGroupOrder,
  updateGroupOrderStatus,
  extendGroupOrder,
};
