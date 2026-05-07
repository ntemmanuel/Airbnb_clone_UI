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

import type { Listing } from '../types';
import { useFavorites } from '../hooks/useFavorites';

import styles from './ListingCard.module.css';

// This component displays a single listing card.
//
// New additions:
// - Framer Motion mount animation
// - CSS Modules for style isolation
// - Favorites powered by global store

interface Props {
  listing: Listing;
}

export const ListingCard = ({ listing }: Props) => {
  const { isSaved, toggle } = useFavorites();

  const saved = isSaved(listing.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}

      transition={{
        duration: 0.35,
      }}

      className={clsx(styles.card, {
        [styles.luxury]: listing.price > 300,
        [styles.booked]: !listing.available,
      })}
    >
      <img
        src={listing.img}
        alt={listing.title}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {listing.title}
          </h3>

          <button
            className={clsx(styles.heart, {
              [styles.savedHeart]: saved,
            })}
            onClick={() =>
              toggle(listing.id, listing.title)
            }
          >
            {saved ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className={styles.meta}>
          <p>
            <FaMapMarkerAlt /> {listing.location}
          </p>

          <p>
            <FaStar />{' '}
            {numeral(listing.rating).format('0.00')}
          </p>

          <p>
            {listing.available
              ? 'Available'
              : 'Booked'}
          </p>

          <p>
            Available from{' '}
            {format(
              new Date(listing.availableFrom),
              'MMM dd, yyyy'
            )}
          </p>
        </div>

        <p className={styles.price}>
          {numeral(listing.price).format('$0')}
          /night
        </p>

        {listing.superhost && (
          <span className={styles.superhost}>
            Superhost
          </span>
        )}

        {listing.price > 300 && (
          <span className={styles.luxuryBadge}>
            Luxury
          </span>
        )}
      </div>
    </motion.div>
  );
};