import { useEffect, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBars,
  faGlobe,
  faUserCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../features/auth/hooks/useAuth';

import './Navbar.css';

// Shared navbar component
//
// Responsibilities:
// - Global navigation
// - Auth modal UI
// - User menu dropdown
// - Login / signup actions
//
// Why this exists:
// The navbar appears across the entire app.
// It acts as the global entry point for authentication.

export const Navbar = () => {
  // Mobile/profile dropdown state
  const [menuOpen, setMenuOpen] = useState(false);

  // Auth state + modal controls from global auth context
  const {
    isAuthenticated,
    login,
    logout,

    showAuthModal,
    authMode,

    openLogin,
    openSignup,
    closeAuthModal,
  } = useAuth();

  // Modal ref
  //
  // Used for outside-click detection
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeAuthModal();
      }
    };

    if (showAuthModal) {
      document.addEventListener('mousedown', handler);
    }

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [showAuthModal, closeAuthModal]);

  // Close modal on ESC
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAuthModal();
      }
    };

    if (showAuthModal) {
      document.addEventListener('keydown', escHandler);
    }

    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, [showAuthModal, closeAuthModal]);

  // Login submit handler
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fake auth for now
    login('demo@email.com', 'password');

    closeAuthModal();
  };

  // Signup submit handler
  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fake signup -> authenticate instantly
    login('demo@email.com', 'password');

    closeAuthModal();
  };

  return (
    <>
      <header className='navbar'>
        <div className='navbar__content'>
          {/* LOGO */}
          <NavLink to='/' className='navbar__logo'>
            <img src='./Airbnb_Logo_1.png' alt='Airbnb' />
          </NavLink>

          {/* RIGHT SIDE */}
          <div className='navbar__right'>
            {/* Become host */}
            <button
              className='hostBtn'
              onClick={isAuthenticated ? undefined : openSignup}
            >
              Become a host
            </button>

            {/* Globe */}
            <button className='globeBtn'>
              <FontAwesomeIcon icon={faGlobe} />
            </button>

            {/* MENU */}
            <div className='menuWrapper'>
              <button
                className='menuBtn'
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FontAwesomeIcon icon={faBars} />

                <FontAwesomeIcon icon={faUserCircle} />
              </button>

              {menuOpen && (
                <div className='dropdownMenu'>
                  {!isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          openLogin();
                          setMenuOpen(false);
                        }}
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        Log in
                      </button>

                      <button
                        onClick={() => {
                          openSignup();
                          setMenuOpen(false);
                        }}
                      >
                        Sign up
                      </button>

                      <hr />

                      <button
                        onClick={() => {
                          openSignup();
                          setMenuOpen(false);
                        }}
                      >
                        Become a host
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to='/dashboard'
                        className='menuLink'
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </NavLink>

                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                      >
                        Log out
                      </button>
                    </>
                  )}

                  <button>Help Center</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className='authOverlay'>
          <div
            ref={modalRef}
            className={`authModal ${
              authMode === 'signup' ? 'signupModal' : ''
            }`}
          >
            {/* HEADER */}
            <div className='authHeader'>
              <h2>
                {authMode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>

              <button className='closeBtn' onClick={closeAuthModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* LOGIN */}
            {authMode === 'login' ? (
              <form className='authForm' onSubmit={handleLogin}>
                <input type='email' placeholder='Email address' required />

                <input type='password' placeholder='Password' required />

                <button type='submit' className='authSubmit'>
                  Log in
                </button>

                <p className='switchAuth'>
                  Don't have an account?{' '}
                  <span onClick={openSignup}>Create account</span>
                </p>
              </form>
            ) : (
              // SIGNUP
              <form className='authForm' onSubmit={handleSignup}>
                <input type='text' placeholder='Full name' required />

                <input type='text' placeholder='Username' required />

                <input type='email' placeholder='Email address' required />

                <input type='tel' placeholder='Phone number' />

                <input type='password' placeholder='Password' required />

                {/* ROLE */}
                <div className='roleContainer'>
                  <label>I want to</label>

                  <div className='roleOptions'>
                    <button type='button'>
                      Book places
                      <span>Guest</span>
                    </button>

                    <button type='button'>
                      Host my home
                      <span>Host</span>
                    </button>
                  </div>
                </div>

                <textarea placeholder='Bio (optional)' rows={4} />

                <button type='submit' className='authSubmit'>
                  Create account
                </button>

                <p className='switchAuth'>
                  Already have an account?{' '}
                  <span onClick={openLogin}>Log in</span>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
