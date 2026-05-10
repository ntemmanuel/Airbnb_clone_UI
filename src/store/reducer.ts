import type { Action, State } from './types';

// This reducer is responsible for updating global state.
//
// IMPORTANT:
// - Reducers must be PURE functions
// - Never mutate state directly
// - Always return a NEW object
//
// A reducer receives:
// 1. current state
// 2. action describing what happened
//
// Then returns:
// → the next state

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Replace listings in state
    case 'SET_LISTINGS':
      return {
        ...state,
        listings: action.payload,
      };

    // Update loading state
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    // Update search/filter query
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'RESET':
      return {
        ...state,
        filter: '',
        saved: [],
      };

    case 'TOGGLE_SAVED_ONLY':
      return {
        ...state,

        savedOnly: !state.savedOnly,
      };

    // Save/unsave a listing
    case 'TOGGLE_FAVORITE': {
      const exists = state.saved.includes(action.payload);

      return {
        ...state,
        saved: exists
          ? state.saved.filter((id) => id !== action.payload)
          : [...state.saved, action.payload],
      };
    }

    // Fallback: return current state unchanged
    default:
      return state;
  }
};
