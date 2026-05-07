// This component renders the footer at the bottom of the app.
//
// Responsibility:
// - Provide basic site info and links
// - Anchor the layout visually
//
// Why this exists:
// - Completes the page structure
// - Keeps layout consistent across pages

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        {/* Left side */}
        <p className='footer__text'>© {new Date().getFullYear()} Staybnb</p>

        {/* Right side links */}
        <div className='footer__links'>
          <a href='#'>Privacy</a>
          <a href='#'>Terms</a>
          <a href='#'>Contact</a>
        </div>
      </div>
    </footer>
  );
};
