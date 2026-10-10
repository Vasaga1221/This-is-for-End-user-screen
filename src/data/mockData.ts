import { Salon, ServiceItem, Stylist, Appointment } from '../types';

import heroCoverImg from '../assets/images/salon_hero_cover_1791610059829.jpg';
import featuredCardImg from '../assets/images/salon_featured_card_1791610072991.jpg';
import seasonalBannerImg from '../assets/images/seasonal_ritual_banner_1791610083140.jpg';
import stylistAvatarImg from '../assets/images/master_stylist_avatar_1791610092986.jpg';
import balayageServiceImg from '../assets/images/balayage_hair_service_1791610104438.jpg';

export const ASSET_IMAGES = {
  heroCover: heroCoverImg,
  featuredCard: featuredCardImg,
  seasonalBanner: seasonalBannerImg,
  stylistAvatar: stylistAvatarImg,
  balayageService: balayageServiceImg,
};

export const PRIMARY_SALON: Salon = {
  id: 'maison-de-beaute',
  name: 'Maison de Beauté Luxe',
  rating: 4.9,
  reviewsCount: 428,
  tier: 'Haute Salon',
  location: 'Pali Hill, Bandra West, Mumbai',
  area: 'Bandra West, Mumbai',
  distance: '1.2 km away',
  openingHours: 'Open today • 9:00 AM - 8:30 PM',
  startingPrice: 1800,
  image: featuredCardImg,
  heroImage: heroCoverImg,
  totalPhotos: 12,
  verified: true,
};

export const FEATURED_SALONS: Salon[] = [
  PRIMARY_SALON,
  {
    id: 'velvet-loft',
    name: 'The Velvet Loft Sanctuary',
    rating: 4.8,
    reviewsCount: 312,
    tier: 'Artisan Atelier',
    location: 'Turner Road, Bandra West, Mumbai',
    area: 'Bandra West, Mumbai',
    distance: '1.8 km away',
    openingHours: 'Open today • 10:00 AM - 9:00 PM',
    startingPrice: 1500,
    image: heroCoverImg,
    heroImage: heroCoverImg,
    totalPhotos: 9,
    verified: true,
  },
  {
    id: 'atelier-prive',
    name: 'L’Atelier Privé Coiffure',
    rating: 4.95,
    reviewsCount: 540,
    tier: 'Bespoke Haven',
    location: 'Altamount Road, South Mumbai',
    area: 'South Mumbai',
    distance: '9.4 km away',
    openingHours: 'Open today • 9:30 AM - 8:00 PM',
    startingPrice: 2800,
    image: featuredCardImg,
    heroImage: featuredCardImg,
    totalPhotos: 16,
    verified: true,
  },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'balayage-gloss',
    name: 'Sun-Kissed Balayage & Gloss',
    duration: '150 mins (2.5 hrs)',
    durationMinutes: 150,
    price: 7500,
    category: 'hair',
    description: 'Premium French hand-painted lightening with bond protector, tone-balancing gloss and deep condition.',
    addon: {
      id: 'scalp-exfoliation',
      name: 'Deep Scalp Exfoliation',
      price: 850,
    },
    image: balayageServiceImg,
    popular: true,
  },
  {
    id: 'artisan-cut-blowdry',
    name: 'Artisan Cut & Bespoke Blowdry',
    duration: '60 mins',
    durationMinutes: 60,
    price: 2400,
    category: 'hair',
    description: 'Includes customized hair & scalp consultation, caviar shampoo wash, and runway finish.',
    addon: {
      id: 'kerastase-booster',
      name: 'Kérastase Fusio-Dose Booster',
      price: 600,
    },
  },
  {
    id: 'caviar-royal-condition',
    name: 'Chronologiste Caviar Conditioning',
    duration: '75 mins',
    durationMinutes: 75,
    price: 4200,
    category: 'hair',
    description: 'Youth revitalizing miracle hair spa with mimetic caviar pearls and hyaluronic hydration.',
  },
  {
    id: 'ayurvedic-head-shirodhara',
    name: 'Sattvic Herbal Shirodhara & Scalp',
    duration: '90 mins',
    durationMinutes: 90,
    price: 5200,
    category: 'spa',
    description: 'Meditative warm herb-infused oil stream with Marma pressure point release and hair root strengthening.',
  },
  {
    id: 'rose-gold-facial-ritual',
    name: '24K Luminescence Facial Ritual',
    duration: '80 mins',
    durationMinutes: 80,
    price: 6800,
    category: 'facial',
    description: 'Cellular regeneration with micro-current lifting, diamond crystal peel, and 24K gold leaf infusion.',
  },
  {
    id: 'couture-gel-manicure',
    name: 'Artisan Gel Couture & Paraffin Pedi',
    duration: '90 mins',
    durationMinutes: 90,
    price: 3400,
    category: 'nails',
    description: 'Precision cuticles, botanical salt soak, hot basalt stone massage, and long-lasting glass gel coat.',
  },
];

export const STYLISTS: Stylist[] = [
  {
    id: 'aarav-mehta',
    name: 'Aarav Mehta',
    initials: 'AM',
    title: 'Master Art Director',
    tier: 'Celebrity Stylist',
    avatar: stylistAvatarImg,
    available: true,
    rating: 4.98,
  },
  {
    id: 'any-specialist',
    name: 'Any Specialist',
    initials: '✨',
    title: 'Fastest Booking',
    tier: 'First Available Senior Artist',
    avatar: '',
    available: true,
    rating: 4.9,
  },
  {
    id: 'zara-khan',
    name: 'Zara Khan',
    initials: 'ZK',
    title: 'Principal Balayage Artist',
    tier: 'Color Specialist',
    avatar: stylistAvatarImg,
    available: true,
    rating: 4.94,
  },
  {
    id: 'dev-singhania',
    name: 'Dev Singhania',
    initials: 'DS',
    title: 'Texture & Sculpt Specialist',
    tier: 'Lead Stylist',
    avatar: stylistAvatarImg,
    available: false,
    rating: 4.89,
  },
];

export const UPCOMING_APPOINTMENT_DATA: Appointment = {
  id: 'aur-89241',
  bookingRef: 'AUR-89241',
  salon: PRIMARY_SALON,
  service: SERVICES_CATALOG[0],
  hasAddon: false,
  stylist: STYLISTS[0],
  dateStr: 'Tomorrow, Oct 17, 2025',
  timeStr: '1:30 PM (IST)',
  countdown: 'In 22 hours',
  totalAmount: 7500,
  taxAmount: 1350,
  discountAmount: 1000,
  grandTotal: 7850,
  promoCode: 'AURALUXE',
  paymentMethod: 'upi',
  status: 'confirmed',
};

export const PREVIOUS_VISITS = [
  {
    id: 'prev-1',
    salon: 'The Velvet Loft',
    service: 'Signature Haircut & Blowout',
    date: 'Sep 28, 2025',
    price: '₹2,400',
    stylist: 'Dev Singhania',
  },
  {
    id: 'prev-2',
    salon: 'Maison de Beauté Luxe',
    service: 'Kérastase Deep Nourish Spa',
    date: 'Aug 14, 2025',
    price: '₹4,100',
    stylist: 'Aarav Mehta',
  },
];

export const AVAILABLE_DATES = [
  { day: 'Thu', date: '16', fullDate: 'Thursday, Oct 16, 2025' },
  { day: 'Fri', date: '17', fullDate: 'Friday, Oct 17, 2025' },
  { day: 'Sat', date: '18', fullDate: 'Saturday, Oct 18, 2025' },
  { day: 'Sun', date: '19', fullDate: 'Sunday, Oct 19, 2025' },
  { day: 'Mon', date: '20', fullDate: 'Monday, Oct 20, 2025' },
];

export const TIME_SLOTS = [
  { time: '10:00 AM', status: 'open' },
  { time: '01:30 PM', status: 'selected' },
  { time: '03:00 PM', status: 'open' },
  { time: '04:30 PM', status: 'open' },
  { time: '06:00 PM', status: 'booked' },
  { time: '07:30 PM', status: 'open' },
];
