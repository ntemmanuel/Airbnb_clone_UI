import { useState } from 'react';
import type { ReactNode } from 'react';

import { AuthContext } from './context';

// Provider props
interface Props {
  children: ReactNode;
}

// Provides authentication state globally
export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fake login
  const login = (email: string, password: string) => {
    console.log(email, password);

    setIsAuthenticated(true);
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider
  value={{
    isAuthenticated,
    login,
    logout,

    showAuthModal,
    authMode,

    openLogin,
    openSignup,
    closeAuthModal,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};
