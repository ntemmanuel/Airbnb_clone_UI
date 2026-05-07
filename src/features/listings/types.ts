// This file defines the shape of listing data used across the app.
// Think of it as the "blueprint" for every listing.
// Any component, page, or function that works with listings
// should rely on these types to stay consistent and predictable.

// Category is a restricted set of allowed values for listing types.
// This prevents invalid categories and helps with filtering later.
export type Category = 'beach' | 'mountain' | 'city' | 'countryside';

// Listing describes exactly what a single listing object looks like.
// Every listing in the app MUST follow this structure.
export interface Listing {
  // Unique identifier for each listing (used for keys, updates, etc.)
  id: number;

  // The title shown to users (e.g. "Cozy Beachfront Villa")
  title: string;

  // Location of the listing (city, country, or general area)
  location: string;

  // Price per night (stored as a number, formatted later for display)
  price: number;

  // Average rating (e.g. 4.97)
  rating: number;

  // Whether the host is marked as a "superhost"
  superhost: boolean;

  // Whether the listing is currently available for booking
  available: boolean;

  // The date the listing becomes available (ISO string format)
  // This will later be formatted using date-fns
  availableFrom: string;

  // URL to the listing image
  img: string;

  // Category of the listing (must be one of the defined Category values)
  category: Category;
}