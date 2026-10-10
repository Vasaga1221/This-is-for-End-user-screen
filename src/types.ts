export type ScreenId = 'auth' | 'home' | 'catalog' | 'booking' | 'pass';

export type DeviceMode = 'ios' | 'android' | 'artboard' | 'responsive';

export type TabId = 'home' | 'explore' | 'bookings' | 'saved' | 'profile';

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  durationMinutes: number;
  price: number;
  description: string;
  category: 'hair' | 'spa' | 'facial' | 'nails';
  addon?: {
    id: string;
    name: string;
    price: number;
  };
  image?: string;
  popular?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  initials: string;
  title: string;
  tier: string;
  avatar: string;
  available: boolean;
  rating: number;
}

export interface Salon {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  tier: string;
  location: string;
  area: string;
  distance: string;
  openingHours: string;
  startingPrice: number;
  image: string;
  heroImage: string;
  totalPhotos: number;
  verified: boolean;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  salon: Salon;
  service: ServiceItem;
  hasAddon: boolean;
  stylist: Stylist;
  dateStr: string;
  timeStr: string;
  countdown: string;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  promoCode?: string;
  paymentMethod: 'upi' | 'card' | 'counter';
  status: 'confirmed' | 'completed' | 'in_progress';
}
