// Types for the beverage ordering functionality

// Beverage Category
export interface IBeverageCategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  beverages?: IBeverage[];
}

// Beverage
export interface IBeverage {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isPopular: boolean;
  isNew: boolean;
  categoryId: number;
  category?: IBeverageCategory;
  customizations?: IBeverageCustomization[];
}

// Beverage Customization
export interface IBeverageCustomization {
  id: number;
  name: string;
  type: string; // e.g., "size", "temperature", "sweetness", "ice", "add-in"
  options: ICustomizationOption[];
  beverageId: number;
}

// Customization Option
export interface ICustomizationOption {
  id: string;
  name: string;
  price: number;
}

// Selected Customization
export interface ISelectedCustomization {
  name: string;
  value: string;
  price?: number;
}

// Cart Item
export interface ICartItem {
  id: string;
  sessionId: string;
  beverageId: number;
  beverage?: IBeverage;
  quantity: number;
  customizations?: ISelectedCustomization[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Order
export interface IOrder {
  id: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status: string;
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  items: IOrderItem[];
  groupOrderId?: number;
  groupOrder?: IGroupOrder;
}

// Order Item
export interface IOrderItem {
  id: number;
  orderId: number;
  beverageId: number;
  beverage: IBeverage;
  quantity: number;
  price: number;
  customizations?: ISelectedCustomization[];
  notes?: string;
}

// Group Order
export interface IGroupOrder {
  id: number;
  name: string;
  shareCode: string;
  creatorName: string;
  expiresAt: string;
  status: string;
  createdAt: string;
  orders: IOrder[];
}

// Query Parameters
export interface IBeverageQueryParams {
  popular?: boolean;
  new?: boolean;
  categoryId?: number;
  limit?: number;
  offset?: number;
}

export interface ICreateOrderParams {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: {
    beverageId: number;
    quantity: number;
    price: number;
    customizations?: ISelectedCustomization[];
    notes?: string;
  }[];
  paymentMethod?: string;
  groupOrderId?: number;
}

export interface ICreateGroupOrderParams {
  name: string;
  creatorName: string;
  expiresInMinutes?: number;
}

export interface IExtendGroupOrderParams {
  additionalMinutes?: number;
}
