import { useEffect } from 'react';

import { listings } from '../../../data/listings';
import { useStore } from '../../../store/useStore';

// This hook is responsible for loading listings data.
//
// Why this exists:
// - Keeps fetching/loading logic OUT of components
// - Makes data loading reusable
// - Keeps pages cleaner
//
// In real apps this would call an API.
// Here we simulate a network request with setTimeout.

export const useListings = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    // Start loading
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });

    // Simulate async request
    const timer = setTimeout(() => {
      dispatch({
        type: 'SET_LISTINGS',
        payload: listings,
      });

      dispatch({
        type: 'SET_LOADING',
        payload: false,
      });
    }, 1500);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, [dispatch]);

  return {
    listings: state.listings,
    loading: state.loading,
    filter: state.filter,
  };
};