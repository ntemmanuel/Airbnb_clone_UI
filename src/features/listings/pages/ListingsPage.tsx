import { useMemo } from 'react';

import { ListingCard } from '../components/ListingCard';
import { SavedBadge } from '../components/SavedBadge';
import { SavedListings } from '../components/SavedListings';
import { SearchBar } from '../components/SearchBar';

import { Spinner } from '../../../shared/components/Spinner';

import { useListings } from '../hooks/useListings';

import { useStore } from '../../../store/useStore';

// This page now acts mostly as a composition layer.
//
// Logic has been extracted into:
// - global store
// - custom hooks
//
// The page simply:
// - reads state
// - derives filtered data
// - renders UI

export const ListingsPage = () => {
  // Load listings on mount
  useListings();

  const { state } = useStore();

  // Memoized filtering
  //
  // Why useMemo?
  // - Prevents unnecessary recalculation
  // - Improves performance
  const filteredListings = useMemo(() => {
    return state.listings.filter((listing) => {
      const query = state.filter.toLowerCase();

      return (
        listing.title
          .toLowerCase()
          .includes(query) ||
        listing.location
          .toLowerCase()
          .includes(query)
      );
    });
  }, [state.listings, state.filter]);

  // Loading state
  if (state.loading) {
    return <Spinner />;
  }

  return (
    <div className="listings-page">
      <div className="listings-header">
        <SearchBar />

        <SavedBadge count={state.saved.length} />
      </div>

      <p className="listings-count">
        {filteredListings.length} result
        {filteredListings.length !== 1 && 's'}
      </p>

      <div className="listings-grid">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
          />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <p className="listings-empty">
          No listings found.
        </p>
      )}

      <SavedListings />
    </div>
  );
};