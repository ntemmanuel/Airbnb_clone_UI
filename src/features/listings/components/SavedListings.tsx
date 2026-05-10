import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

import { listings } from '../../../data/listings';

import { useStore } from '../../../store/useStore';

// This component proves global state works.
//
// It can access saved listings directly from the store
// WITHOUT receiving props from parent components.
//
// The panel animates using Headless UI Transition.

export const SavedListings = () => {
  const { state } = useStore();

  const savedListings = listings.filter((listing) =>
    state.saved.includes(listing.id)
  );

  return (
    <Transition
      as={Fragment}
      show={savedListings.length > 0}

      enter="transition duration-300 ease-out"
      enterFrom="transform translate-x-full opacity-0"
      enterTo="transform translate-x-0 opacity-100"

      leave="transition duration-200 ease-in"
      leaveFrom="transform translate-x-0 opacity-100"
      leaveTo="transform translate-x-full opacity-0"
    >
      <aside className="saved-panel">
        <h3 style={{ fontWeight: 'bold' }}>Saved Listings</h3>

        <ul>
          {savedListings.map((listing) => (
            <li key={listing.id}>
              {listing.title}
            </li>
          ))}
        </ul>
      </aside>
    </Transition>
  );
};