import toast from 'react-hot-toast';

import { useStore } from '../../../store/useStore';

// This hook centralizes all "saved listings" logic.
//
// Why this exists:
// - Prevents duplicate favorite logic everywhere
// - Keeps components simple
// - Makes save behavior reusable

export const useFavorites = () => {
  const { state, dispatch } = useStore();

  // Check if listing is already saved
  const isSaved = (id: number) => {
    return state.saved.includes(id);
  };

  // Toggle save/unsave
  const toggle = (id: number, title: string) => {
    const alreadySaved = isSaved(id);

    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: id,
    });

    // Toast feedback
    toast.success(
      alreadySaved
        ? `Removed "${title}" from saved`
        : `Saved "${title}"`
    );
  };

  return {
    saved: state.saved,
    count: state.saved.length,
    isSaved,
    toggle,
  };
};