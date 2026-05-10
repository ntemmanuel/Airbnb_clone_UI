import dayjs from 'dayjs';

import {
  FaMapMarkerAlt,
  FaStar,
} from 'react-icons/fa';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import numeral from 'numeral';

import { useStore } from '../../../store/useStore';

// Listing detail page
//
// Responsibilities:
// - Read route param
// - Find matching listing
// - Render full listing details
//
// Why this exists:
// Allows each listing to have
// its own shareable URL.

export const ListingDetail = () => {
  // Read route param
  const { id } = useParams();

  // Browser navigation
  const navigate = useNavigate();

  // Global store access
  const { state } = useStore();

  // Find matching listing
  const listing = state.listings.find(
    (item) => item.id === Number(id)
  );

  // Listing not found
  if (!listing) {
    return (
      <div className="listing-detail listing-detail--empty">
        <h1>Listing not found</h1>

        <button
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="listing-detail">

      {/* Back button */}
      <button
        className="listing-detail__back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Image */}
      <img
        src={listing.img}
        alt={listing.title}
        className="listing-detail__image"
      />

      {/* Content */}
      <div className="listing-detail__content">

        {/* Header */}
        <div className="listing-detail__header">

          <h1 className="listing-detail__title">
            {listing.title}
          </h1>

          {/* Superhost badge */}
          {listing.superhost && (
            <span className="listing-detail__badge">
              Superhost
            </span>
          )}

        </div>

        {/* Location */}
        <p className="listing-detail__location">
          <FaMapMarkerAlt />

          {listing.location}
        </p>

        {/* Rating */}
        <p className="listing-detail__rating">
          <FaStar />

          {numeral(listing.rating).format(
            '0.00'
          )}
        </p>

        {/* Price */}
        <p className="listing-detail__price">
          {numeral(listing.price).format(
            '$0,0'
          )}
          {' '}night
        </p>

        {/* Availability */}
        <p className="listing-detail__availability">
          {listing.available
            ? 'Available'
            : 'Booked'}
        </p>

        {/* Date */}
        <p className="listing-detail__date">
          Available from{' '}
          {dayjs(
            listing.availableFrom
          ).format('MMM D, YYYY')}
        </p>

      </div>
    </section>
  );
};