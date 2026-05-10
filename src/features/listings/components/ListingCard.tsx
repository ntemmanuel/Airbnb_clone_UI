import clsx from 'clsx';

import { motion } from 'framer-motion';

import { format } from 'date-fns';
import numeral from 'numeral';

import {
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart,
  FaStar,
} from 'react-icons/fa';

import { memo } from 'react';

import { useNavigate } from 'react-router-dom';

import type { Listing } from '../types';

import { useFavorites } from '../hooks/useFavorites';

import { useAuth } from '../../auth/hooks/useAuth';

import styles from './ListingCard.module.css';

// Listing card component
//
// Responsibilities:
// - Display listing information
// - Handle favorite/save interaction
// - Navigate to detail page
// - Require authentication before actions
//
// Why this exists:
// Keeps listing UI isolated and reusable.
// The page only passes listing data.
// All interaction logic stays encapsulated here.

interface Props {
  listing: Listing;
}

export const ListingCard = memo(
  ({ listing }: Props) => {
    // Router navigation
    const navigate = useNavigate();

    // Global auth state
    const {
      isAuthenticated,
      openLogin,
    } = useAuth();

    // Favorites logic
    const {
      isSaved,
      toggle,
    } = useFavorites();

    // Saved state
    const saved = isSaved(
      listing.id,
    );

    // Open detail page
    //
    // Require authentication first.
    const handleOpenListing = () => {
      if (!isAuthenticated) {
        openLogin();

        return;
      }

      navigate(
        `/listings/${listing.id}`,
      );
    };

    // Toggle favorite
    //
    // Require authentication first.
    const handleFavorite = (
      e: React.MouseEvent<HTMLButtonElement>,
    ) => {
      // Prevent card click navigation
      e.stopPropagation();

      if (!isAuthenticated) {
        openLogin();

        return;
      }

      toggle(
        listing.id,
        listing.title,
      );
    };

    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className={styles.cardLink}
        onClick={
          handleOpenListing
        }
      >
        <div
          className={clsx(
            styles.card,
            {
              [styles.luxury]:
                listing.price >
                300,

              [styles.booked]:
                !listing.available,
            },
          )}
        >
          {/* IMAGE */}
          <img
            src={listing.img}
            alt={listing.title}
            className={
              styles.image
            }
          />

          {/* HEART BUTTON */}
          <button
            className={clsx(
              styles.heart,
              {
                [styles.savedHeart]:
                  saved,
              },
            )}
            onClick={
              handleFavorite
            }
          >
            {saved ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </button>

          {/* CONTENT */}
          <div
            className={
              styles.content
            }
          >
            {/* HEADER */}
            <div
              className={
                styles.header
              }
            >
              <h3
                className={
                  styles.title
                }
              >
                {listing.title}
              </h3>
            </div>

            {/* METADATA */}
            <div
              className={
                styles.meta
              }
            >
              <p>
                <FaMapMarkerAlt />

                {listing.location}
              </p>

              <p>
                <FaStar />

                {numeral(
                  listing.rating,
                ).format(
                  '0.00',
                )}
              </p>

              <p>
                {listing.available
                  ? 'Available'
                  : 'Booked'}
              </p>

              <p>
                Available from{' '}
                {format(
                  new Date(
                    listing.availableFrom,
                  ),
                  'MMM dd, yyyy',
                )}
              </p>
            </div>

            {/* PRICE */}
            <p
              className={
                styles.price
              }
            >
              {numeral(
                listing.price,
              ).format('$0')}
              /night
            </p>

            {/* BADGES */}
            <div
              className={
                styles.badges
              }
            >
              {listing.superhost && (
                <span
                  className={
                    styles.superhost
                  }
                >
                  Superhost
                </span>
              )}

              {listing.price >
                300 && (
                <span
                  className={
                    styles.luxuryBadge
                  }
                >
                  Luxury
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);