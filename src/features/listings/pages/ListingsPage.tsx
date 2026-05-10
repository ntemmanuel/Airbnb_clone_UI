import { useMemo } from 'react';

import { ListingCard } from '../components/ListingCard';
// import { SavedBadge } from '../components/SavedBadge';
import { SavedListings } from '../components/SavedListings';
import { SearchBar } from '../components/SearchBar';

import { Spinner } from '../../../shared/components/Spinner';

import { useListings } from '../hooks/useListings';

import { useStore } from '../../../store/useStore';

import './ListingsPage.css';

// Listings page
//
// Responsibilities:
// - Load listings
// - Read global store state
// - Filter listings
// - Render listing grid
// - Render saved panel
//
// Why this exists:
// This is the feature composition layer.
// State lives in the global store.
// Components stay reusable and focused.

export const ListingsPage = () => {
  // Load listings on first mount
  //
  // Hook internally handles:
  // - loading state
  // - simulated async fetch
  // - dispatching listings to store
  useListings();

  // Global store access
  const { state } = useStore();

  // Memoized filtered results
  //
  // Why useMemo?
  // Prevents recalculating filters
  // on every render unless dependencies change.
  const filteredListings = useMemo(() => {
    const query = state.filter.toLowerCase();

    return state.listings.filter((listing) => {
      // Match title OR location
      const matchesQuery =
        listing.title.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query);

      // Optional saved-only filtering
      const matchesSaved =
        !state.savedOnly ||
        state.saved.includes(listing.id);

      return (
        matchesQuery &&
        matchesSaved
      );
    });
  }, [
    state.listings,
    state.filter,
    state.saved,
    state.savedOnly,
  ]);

  // Loading UI
  if (state.loading) {
    return <Spinner />;
  }

  return (
    <section className='listings-page'>
      {/* Header */}
      <div className='listings-header'>
        {/* Search */}
        <SearchBar />

        {/* Right controls */}
        <div className='listings-actions'>
          {/* Saved count */}
          {/* <SavedBadge count={state.saved.length} /> */}

          {/* Saved-only toggle */}
          {/* <button
            className='listings-button'
            onClick={() =>
              dispatch({
                type: 'TOGGLE_SAVED_ONLY',
              })
            }
          >
            {state.savedOnly
              ? 'Show All'
              : 'Saved Only'}
          </button> */}

          {/* Reset filters + favorites */}
          {/* <button
            className='listings-button listings-button--danger'
            onClick={() =>
              dispatch({
                type: 'RESET',
              })
            }
          >
            Clear All
          </button> */}
        </div>
      </div>

      {/* Results count */}
      <p className='listings-count'>
        {filteredListings.length} result
        {filteredListings.length !== 1 &&
          's'}
      </p>

      {/* Empty state */}
      {filteredListings.length === 0 ? (
        <p className='listings-empty'>
          No listings found.
        </p>
      ) : (
        // Responsive grid layout
        //
        // Why this exists:
        // Cleaner Airbnb-style layout
        // Simpler than virtualization
        // Better UX for medium-sized lists
        <div className='listingsGrid'>
          {filteredListings.map(
            (listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ),
          )}
        </div>
      )}

      {/* Slide-in saved panel */}
      <SavedListings />
    </section>
  );
};