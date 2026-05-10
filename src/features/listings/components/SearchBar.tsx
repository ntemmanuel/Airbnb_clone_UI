import { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faMagnifyingGlass,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { DateRange } from 'react-date-range';
import type { Range, RangeKeyDict } from 'react-date-range';

import { format } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useStore } from '../../../store/useStore';

// Airbnb-style search bar
//
// Responsibilities:
// - Collect search inputs
// - Dispatch filters to global store
// - Manage calendar UI
// - Manage guest counter
//
// Why this exists:
// Keeps search/filter UX isolated from listings page logic.

export const SearchBar = () => {
  const { state, dispatch } = useStore();

  // Search location input
  const [location, setLocation] = useState(state.filter || '');

  // Guest count
  const [guests, setGuests] = useState(1);

  // Calendar visibility
  const [showCalendar, setShowCalendar] = useState(false);

  // Calendar ref
  //
  // Used for outside-click detection
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Selected date range
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  // Close calendar on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  // Execute search
  //
  // Dispatches filters to global store.
  const handleSearch = () => {
    const startDate = dateRange[0].startDate ?? new Date();

    const endDate = dateRange[0].endDate ?? new Date();

    // Basic search filter
    //
    // ListingsPage already filters
    // using state.filter.
    dispatch({
      type: 'SET_FILTER',
      payload: location,
    });

    // Optional advanced filter
    //
    // Keep this if your reducer supports it.
    dispatch({
      type: 'SET_ADVANCED_FILTER',

      payload: {
        location,

        checkIn: startDate.toISOString(),

        checkOut: endDate.toISOString(),

        guests: guests.toString(),
      },
    });

    // Close calendar after search
    setShowCalendar(false);
  };

  // Submit on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='searchWrapper'>
      <div className='airbnbSearchBar'>
        {/* WHERE */}
        <div className='searchSection whereSection'>
          <label>Where</label>

          <input
            type='text'
            placeholder='Search destinations'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className='divider' />

        {/* WHEN */}
        <div
          className='searchSection whenSection'
          onClick={() => setShowCalendar(true)}
        >
          <label>When</label>

          <span className='dateText'>
            {`${format(dateRange[0].startDate!, 'MMM dd')} - ${format(
              dateRange[0].endDate!,
              'MMM dd',
            )}`}
          </span>

          {/* CALENDAR */}
          {showCalendar && (
            <div className='calendarPopup' ref={calendarRef}>
              <DateRange
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                onChange={(ranges: RangeKeyDict) => {
                  setDateRange([ranges.selection]);
                }}
                minDate={new Date()}
                rangeColors={['#FF385C']}
              />
            </div>
          )}
        </div>

        <div className='divider' />

        {/* WHO */}
        <div className='searchSection guestSection'>
          <label>Who</label>

          <div className='guestControls'>
            {/* Decrease */}
            <button onClick={() => setGuests((prev) => Math.max(1, prev - 1))}>
              <FontAwesomeIcon icon={faMinus} />
            </button>

            {/* Count */}
            <span>
              {guests} guest
              {guests > 1 ? 's' : ''}
            </span>

            {/* Increase */}
            <button onClick={() => setGuests((prev) => prev + 1)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <button className='searchButton' onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};
