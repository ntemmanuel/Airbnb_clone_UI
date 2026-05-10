import { Link } from 'react-router-dom';

// 404 fallback page
//
// Responsibilities:
// - Render when no route matches
// - Help users recover navigation
//
// Why this exists:
// Every multi-page app needs a safe
// fallback for invalid URLs.

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
        404
      </h1>

      <p className="not-found__text">
        The page you are looking for does not exist.
      </p>

      {/* Return home */}
      <Link
        to="/"
        className="not-found__link"
      >
        Back to Home
      </Link>
    </div>
  );
};