import type { Listing } from '../features/listings/types';

// This file provides mock (fake) listing data for the app.
// It acts like a temporary database until a real backend/API is added.
//
// Why this file exists:
// - Lets you build and test UI without needing a server
// - Keeps data separate from components (clean architecture)
// - Makes it easy to swap in real API data later
//
// IMPORTANT:
// - Every object must follow the Listing interface
// - This ensures type safety across the app

export const baseListings: Listing[] = [
  {
    id: 1,
    title: 'Oceanfront Escape',
    location: 'Malibu, USA',
    price: 420, // Over $300 → used to test "luxury" styling
    rating: 4.9,
    superhost: true,
    available: true,
    availableFrom: '2025-01-12',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=260&fit=crop',
    category: 'beach',
  },
  {
    id: 2,
    title: 'Mountain Cabin Retreat',
    location: 'Aspen, USA',
    price: 280,
    rating: 4.8,
    superhost: false,
    available: true,
    availableFrom: '2025-02-01',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=260&fit=crop',
    category: 'mountain',
  },
  {
    id: 3,
    title: 'Modern City Apartment',
    location: 'New York, USA',
    price: 310, // Another luxury example
    rating: 4.7,
    superhost: true,
    available: false, // Unavailable → used to test disabled state
    availableFrom: '2025-03-15',
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=260&fit=crop',
    category: 'city',
  },
  {
    id: 4,
    title: 'Countryside Farmhouse',
    location: 'Tuscany, Italy',
    price: 190,
    rating: 4.6,
    superhost: false,
    available: true,
    availableFrom: '2025-01-20',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=260&fit=crop',
    category: 'countryside',
  },
  {
    id: 5,
    title: 'Beach Bungalow',
    location: 'Bali, Indonesia',
    price: 150,
    rating: 4.85,
    superhost: true,
    available: true,
    availableFrom: '2025-01-10',
    img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=260&fit=crop',
    category: 'beach',
  },
  {
    id: 6,
    title: 'Downtown Loft',
    location: 'Berlin, Germany',
    price: 220,
    rating: 4.75,
    superhost: false,
    available: true,
    availableFrom: '2025-02-10',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=260&fit=crop',
    category: 'city',
  },
];

// Generate 50 listings
export const listings: Listing[] =
  Array.from({ length: 50 }, (_, index) => {
    const base =
      baseListings[
        index % baseListings.length
      ];

    return {
      ...base,

      // Ensure unique IDs
      id: index + 1,

      // Slightly unique title
      title: `${base.title} #${index + 1}`,

      // Slightly varied price
      price:
        base.price +
        Math.floor(Math.random() * 40),
    };
  });
