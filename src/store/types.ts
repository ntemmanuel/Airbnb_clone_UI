// This file defines the shape of the GLOBAL application state
// and all allowed actions that can update it.
//
// Think of this as the contract for the store.
//
// Why this exists:
// - Keeps state structure centralized
// - Makes reducer logic type-safe
// - Prevents invalid actions/state updates

import type { Listing } from '../features/listings/types';

// Global application state
export interface State {
  // All listings loaded into the app
  listings: Listing[];

  // Whether listings are currently loading
  loading: boolean;

  // Current search/filter query
  filter: string;

  // Array of saved/favorited listing IDs
  saved: number[];

  savedOnly: boolean;
  advancedFilter: AdvancedFilter;
}

type AdvancedFilter = {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
};

// Action union (all allowed store updates)
//
// This is called a "discriminated union" because each action
// has a unique "type" field.
export type Action =
  | {
      type: 'SET_LISTINGS';
      payload: Listing[];
    }
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'SET_FILTER';
      payload: string;
    }
  | {
      type: 'TOGGLE_FAVORITE';
      payload: number; // listing ID
    }
  | {
      type: 'RESET';
    }
  | {
    type: 'TOGGLE_SAVED_ONLY';
  }  
  | {
    type: 'SET_ADVANCED_FILTER';
    payload: {
      location: string;
      checkIn: string;
      checkOut: string;
      guests: string;
    };
  }