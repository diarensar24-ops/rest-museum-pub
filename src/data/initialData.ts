import { Reservation, RestaurantTable, Review, CustomerOrder } from '../types';

export const RESTAURANT_INFO = {
  name: 'Restaurant Museum Pub',
  subtitle: 'Historic Turkish Bath Gastropub & Coffee Bar',
  rating: 4.6,
  totalReviews: 43,
  address: 'Rruga Shemsi Ahmeti, Mitrovica e Veriut 40000',
  city: 'Mitrovica',
  country: 'Kosovo',
  plusCode: 'VVQC+68 Mitrovica',
  phone: '+386 4 929 97 66',
  facebook: 'https://facebook.com',
  coordinates: {
    lat: 42.8914,
    lng: 20.8660
  },
  openingHours: {
    weekdays: '8:00 AM - 12:00 AM',
    weekends: '8:00 AM - 1:00 AM',
    thursdayStatus: 'Closed · Opens 8 AM Thu',
    schedule: [
      { day: 'Monday', hours: '8:00 AM - 12:00 AM' },
      { day: 'Tuesday', hours: '8:00 AM - 12:00 AM' },
      { day: 'Wednesday', hours: '8:00 AM - 12:00 AM' },
      { day: 'Thursday', hours: '8:00 AM - 12:00 AM' },
      { day: 'Friday', hours: '8:00 AM - 1:00 AM' },
      { day: 'Saturday', hours: '8:00 AM - 1:00 AM' },
      { day: 'Sunday', hours: '9:00 AM - 11:30 PM' }
    ]
  },
  features: [
    'Historic Ottoman Bath (Hamam) Architecture',
    'Specialty Macchiato & Sand Coffee',
    'Craft & International Beer Taps',
    'Outdoor Cobblestone Terrace',
    'Customizable Vegan & Vegetarian Options',
    'Free High-Speed Wi-Fi & Work Friendly'
  ]
};

export const POPULAR_TIMES_DATA = [
  { time: '6 AM', occupancy: 5 },
  { time: '8 AM', occupancy: 25 },
  { time: '9 AM', occupancy: 48, label: 'Morning Macchiato Rush' },
  { time: '11 AM', occupancy: 40 },
  { time: '12 PM', occupancy: 75, label: 'Lunch Break' },
  { time: '2 PM', occupancy: 55 },
  { time: '4 PM', occupancy: 42 },
  { time: '6 PM', occupancy: 70 },
  { time: '8 PM', occupancy: 95, label: 'Peak Pub Atmosphere' },
  { time: '10 PM', occupancy: 80 },
  { time: '12 AM', occupancy: 30 }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Srdjan Zivkovic',
    authorBadge: 'Local Guide',
    reviewsCount: 48,
    photosCount: 57,
    rating: 5,
    date: '6 years ago',
    content: 'Excellent place to visit! Whether you want to eat something quick, or just have a coffee, this is a place to go to! The pub is located in an old Turkish bath (sauna), with enterior which is a blend of old and new. Everywhere you look, you find authentic history with a modern cozy twist.',
    tags: ['ambiance', 'drinks', 'food'],
    likes: 14,
    userLiked: false,
    ownerReply: 'Thank you Srdjan! Honored to preserve this unique Ottoman monument in Mitrovica for everyone to enjoy.'
  },
  {
    id: 'rev-2',
    author: 'Arielle',
    authorBadge: 'Local Guide',
    reviewsCount: 266,
    photosCount: 486,
    rating: 5,
    date: 'Edited 4 years ago',
    content: 'Really nice Pub that is not just great in the evening for drinks, but also offers delicious food at day time - They even adjusted the offered wrap and made it vegan for me :) Highly recommend the outdoor patio and the friendly staff.',
    tags: ['food', 'drinks', 'ambiance'],
    likes: 21,
    userLiked: false,
    ownerReply: 'We are always delighted to accommodate plant-based preferences! Come visit us again soon, Arielle.'
  },
  {
    id: 'rev-3',
    author: 'Marko Petrovic',
    authorBadge: 'Local Guide',
    reviewsCount: 32,
    photosCount: 19,
    rating: 5,
    date: '2 years ago',
    content: 'One of the best beer selections in northern Kosovo! The draft Paulaner and Peja craft beers are always freshly tapped and chilled. Pair that with their handmade pierogi and you will have an unforgettable evening beneath the stone arches.',
    tags: ['beer selection', 'food'],
    likes: 8,
    userLiked: false
  },
  {
    id: 'rev-4',
    author: 'Leonita Krasniqi',
    authorBadge: 'Verified Diner',
    reviewsCount: 15,
    photosCount: 6,
    rating: 5,
    date: '1 year ago',
    content: 'The macchiato here is legendary. Smooth velvety foam, perfect espresso ratio. I often bring foreign colleagues here because the historical bath ambience is unmatched in Mitrovica.',
    tags: ['drinks', 'ambiance'],
    likes: 12,
    userLiked: false
  },
  {
    id: 'rev-5',
    author: 'Rayray Roberts',
    authorBadge: 'Local Guide',
    reviewsCount: 11,
    photosCount: 2,
    rating: 3,
    date: '4 years ago',
    content: 'Rather pretty place but extremely average, boring food, the same menu as everywhere else in Kosovo, and it wasn\'t cooked especially well. When asked for what vegetarian options were recommended they didn\'t recommend any of the vegetarian options promptly. Ambiance is definitely the strong suit.',
    tags: ['food', 'ambiance'],
    likes: 5,
    userLiked: false,
    ownerReply: 'Hi Rayray, we appreciate your constructive feedback. Since then, we have introduced our signature handmade pierogi, curated vegetarian mezze, and specialized staff training.'
  },
  {
    id: 'rev-6',
    author: 'Dren Berisha',
    authorBadge: 'Regular Visitor',
    reviewsCount: 27,
    photosCount: 14,
    rating: 5,
    date: '8 months ago',
    content: 'Live acoustic music on weekends combined with the stone vault acoustics creates pure magic. Great burger with Sharri cheese and fast service even when crowded.',
    tags: ['ambiance', 'beer selection'],
    likes: 9,
    userLiked: false
  }
];

export const INITIAL_TABLES: RestaurantTable[] = [
  { id: 't-1', number: 'Vault 01', area: 'stone-vault', capacity: 4, status: 'reserved', currentReservationId: 'res-101' },
  { id: 't-2', number: 'Vault 02', area: 'stone-vault', capacity: 6, status: 'occupied', currentReservationId: 'res-102' },
  { id: 't-3', number: 'Vault 03', area: 'stone-vault', capacity: 2, status: 'available' },
  { id: 't-4', number: 'Vault 04', area: 'stone-vault', capacity: 8, status: 'available' },
  { id: 't-5', number: 'Bar High-01', area: 'pub-bar', capacity: 2, status: 'available' },
  { id: 't-6', number: 'Bar High-02', area: 'pub-bar', capacity: 2, status: 'occupied' },
  { id: 't-7', number: 'Bar Booth', area: 'pub-bar', capacity: 4, status: 'available' },
  { id: 't-8', number: 'Terrace 01', area: 'historic-terrace', capacity: 4, status: 'reserved', currentReservationId: 'res-103' },
  { id: 't-9', number: 'Terrace 02', area: 'historic-terrace', capacity: 6, status: 'available' },
  { id: 't-10', number: 'Mezzanine 01', area: 'museum-mezzanine', capacity: 4, status: 'available' },
  { id: 't-11', number: 'Mezzanine 02', area: 'museum-mezzanine', capacity: 10, status: 'available' }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    referenceNumber: 'MSP-8492',
    customerName: 'Valon Gashi',
    customerEmail: 'valon.gashi@example.com',
    customerPhone: '+383 44 123 456',
    guests: 4,
    date: '2026-09-02',
    time: '19:30',
    seatingArea: 'stone-vault',
    specialRequests: 'Celebrating wedding anniversary. Quiet romantic corner requested.',
    status: 'confirmed',
    tableNumber: 'Vault 01',
    createdAt: '2026-09-02T10:15:00Z',
    preOrderedItems: [
      { itemId: 's1', name: 'Ottoman Bath Vault Mezze Board', quantity: 1, price: 8.90 },
      { itemId: 'b2', name: 'Paulaner Hefe-Weißbier', quantity: 2, price: 3.50 }
    ],
    finalPrice: 15.90
  },
  {
    id: 'res-102',
    referenceNumber: 'MSP-8493',
    customerName: 'Elena Smirnova',
    customerEmail: 'elena.s@travelmitrovica.org',
    customerPhone: '+381 63 987 654',
    guests: 6,
    date: '2026-09-02',
    time: '20:00',
    seatingArea: 'stone-vault',
    specialRequests: 'Cultural delegation visiting the museum hamam. Interested in history presentation.',
    status: 'seated',
    tableNumber: 'Vault 02',
    createdAt: '2026-09-01T14:20:00Z',
    preOrderedItems: [
      { itemId: 'h2', name: 'Museum Handmade Pierogi', quantity: 3, price: 5.50 },
      { itemId: 'm1', name: 'Traditional Ćevapi (10 pcs)', quantity: 3, price: 6.50 }
    ],
    finalPrice: 36.00
  },
  {
    id: 'res-103',
    referenceNumber: 'MSP-8494',
    customerName: 'Besnik Hoxha',
    customerEmail: 'besnik.h@gmail.com',
    customerPhone: '+383 49 555 333',
    guests: 2,
    date: '2026-09-02',
    time: '21:00',
    seatingArea: 'historic-terrace',
    specialRequests: 'Outdoor terrace preferred if weather permits.',
    status: 'confirmed',
    tableNumber: 'Terrace 01',
    createdAt: '2026-09-02T11:45:00Z'
  },
  {
    id: 'res-104',
    referenceNumber: 'MSP-8495',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@un-mission.org',
    customerPhone: '+383 44 888 999',
    guests: 5,
    date: '2026-09-03',
    time: '18:30',
    seatingArea: 'museum-mezzanine',
    specialRequests: 'Two members are strictly vegan - please prepare the custom vegan wraps and hummus.',
    status: 'pending',
    createdAt: '2026-09-02T12:10:00Z'
  },
  {
    id: 'res-105',
    referenceNumber: 'MSP-8496',
    customerName: 'Adem Krasniqi',
    customerEmail: 'adem.k@mitrovica.net',
    customerPhone: '+386 4 929 11 22',
    guests: 8,
    date: '2026-09-03',
    time: '20:30',
    seatingArea: 'pub-bar',
    specialRequests: 'Birthday celebration. Bringing own birthday cake.',
    status: 'pending',
    createdAt: '2026-09-02T12:40:00Z'
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-7192',
    customerName: 'Artan Berisha',
    customerPhone: '+383 44 777 222',
    orderType: 'dine-in',
    tableNumber: 'Vault 02',
    specialInstructions: 'Extra spicy Balkan mustard on side',
    status: 'preparing',
    createdAt: '2026-09-02T18:40:00Z',
    items: [
      { itemId: 'h2', name: 'Museum Handmade Pierogi', quantity: 2, price: 5.50 },
      { itemId: 'b1', name: 'Peja Craft Dark Draft (0.5L)', quantity: 2, price: 3.50 },
      { itemId: 'c1', name: 'Silky Kosovo Macchiato (Velvet)', quantity: 2, price: 1.80 }
    ],
    finalPrice: 21.60
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-7193',
    customerName: 'Katarina Milic',
    customerPhone: '+381 64 222 119',
    orderType: 'pickup',
    specialInstructions: 'Packed for takeout in heat-insulated container',
    status: 'ready',
    createdAt: '2026-09-02T19:05:00Z',
    items: [
      { itemId: 'm1', name: 'Traditional Ćevapi (10 pcs)', quantity: 2, price: 6.50 },
      { itemId: 'w1', name: 'Grilled Hamam Chicken Wrap', quantity: 1, price: 4.80 }
    ],
    finalPrice: 17.80
  }
];
