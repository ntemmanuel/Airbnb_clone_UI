import { useEffect, useMemo, useRef } from 'react';

import debounce from 'lodash/debounce';

import { useStore } from '../../../store/useStore';

// This component controls global search filtering.
//
// New responsibilities:
// - Dispatch search filter updates to global store
// - Auto-focus input on mount
// - Debounce typing for performance
//
// Why debounce matters:
// Without debounce:
// ❌ filter runs on EVERY keystroke
//
// With debounce:
// ✅ waits until user pauses typing

export const SearchBar = () => {
  const { state, dispatch } = useStore();

  // Reference to input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced dispatch
  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        dispatch({
          type: 'SET_FILTER',
          payload: value,
        });
      }, 300),
    [dispatch],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  }, [debouncedFilter]);

  return (
    <input
      ref={inputRef}
      type='text'
      className='search-bar'
      placeholder='Search listings...'
      defaultValue={state.filter}
      onChange={(e) => {
        debouncedFilter(e.target.value);
      }}
    />
  );
};
