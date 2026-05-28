export interface MenuItem {
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface Order {
  orderId: string;
  timestamp: string;
  name: string;
  drink: string;
  sugar: string;
  ice: string;
  quantity: number;
  totalPrice: number;
}

export type ActionType = 'create' | 'update' | 'delete';
