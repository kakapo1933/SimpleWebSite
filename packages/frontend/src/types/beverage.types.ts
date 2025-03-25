// Types for the beverage ordering functionality

// Beverage Category
export interface BeverageCategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  beverages?: Beverage[];
}

// Beverage
export interface Beverage {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isPopular: boolean;
  isNew: boolean;
  categoryId: number;
  category?: BeverageCategory;
  customizations?: BeverageCustomization[];
}

// Beverage Customization
export interface BeverageCustomization {
  id: number;
  name: string;
  type: string; // e.g., "size", "temperature", "sweetness", "ice", "add-in"
  options: CustomizationOption[];
  beverageId: number;
}

// Customization Option
export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

// Selected Customization
export interface SelectedCustomization {
  name: string;
  value: string;
  price?: number;
}

// Cart Item
export interface CartItem {
  id: string;
  sessionId: string;
  beverageId: number;
  beverage?: Beverage;
  quantity: number;
  customizations?: SelectedCustomization[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Order
export interface Order {
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
  items: OrderItem[];
  groupOrderId?: number;
  groupOrder?: GroupOrder;
}

// Order Item
export interface OrderItem {
  id: number;
  orderId: number;
  beverageId: number;
  beverage: Beverage;
  quantity: number;
  price: number;
  customizations?: SelectedCustomization[];
  notes?: string;
}

// Group Order
export interface GroupOrder {
  id: number;
  name: string;
  shareCode: string;
  creatorName: string;
  expiresAt: string;
  status: string;
  createdAt: string;
  orders: Order[];
}

// Query Parameters
export interface BeverageQueryParams {
  popular?: boolean;
  new?: boolean;
  categoryId?: number;
}

export interface CreateOrderParams {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  items: {
    beverageId: number;
    quantity: number;
    price: number;
    customizations?: SelectedCustomization[];
    notes?: string;
  }[];
  paymentMethod?: string;
  groupOrderId?: number;
}

export interface CreateGroupOrderParams {
  name: string;
  creatorName: string;
  expiresInMinutes?: number;
}

export interface ExtendGroupOrderParams {
  additionalMinutes?: number;
}