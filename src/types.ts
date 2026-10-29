export type DietaryTag = 'vegan' | 'vegetarian' | 'halal' | 'signature' | 'chef-pick' | 'gluten-free';

export interface MenuItem {
  id: string;
  name: string;
  originalName?: string;
  category: 'highlights' | 'coffee-breakfast' | 'starters' | 'mains' | 'wraps-burgers' | 'beers' | 'drinks' | 'desserts';
  price: number;
  description: string;
  ingredients: string[];
  dietary: DietaryTag[];
  highlight?: boolean;
  image: string;
  calories?: number;
  originStory?: string;
  rating?: number;
}

export type SeatingArea = 'stone-vault' | 'pub-bar' | 'historic-terrace' | 'museum-mezzanine';

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: 'dine-in' | 'pickup' | 'delivery';
  tableNumber?: string;
  specialInstructions?: string;
  items: OrderItem[];
  finalPrice: number;
  status: 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Reservation {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  seatingArea: SeatingArea;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  tableNumber?: string;
  createdAt: string;
  preOrderedItems?: OrderItem[];
  finalPrice?: number;
}

export interface Review {
  id: string;
  author: string;
  authorBadge?: string;
  reviewsCount?: number;
  photosCount?: number;
  rating: number;
  date: string;
  content: string;
  tags: ('beer selection' | 'ambiance' | 'drinks' | 'food')[];
  likes: number;
  userLiked?: boolean;
  ownerReply?: string;
}

export interface RestaurantTable {
  id: string;
  number: string;
  area: SeatingArea;
  capacity: number;
  status: 'available' | 'reserved' | 'occupied';
  currentReservationId?: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}
