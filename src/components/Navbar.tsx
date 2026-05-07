// This component renders the top navigation bar.
//
// Responsibility:
// - Show brand/logo
// - Provide simple navigation actions
//
// Why this exists:
// - Gives the app structure and identity
// - Keeps layout separate from pages/features

export const Navbar = () => {
  return (
    <header className='navbar'>
      <div className='navbar__content'>
        {/* Logo / Brand */}
        <h1 className='navbar__logo'>Staybnb</h1>

        {/* Navigation actions */}
        <div className='navbar__actions'>
          <button className='navbar__btn'>Explore</button>
          <button className='navbar__btn'>Login</button>
        </div>
      </div>
    </header>
  );
};
