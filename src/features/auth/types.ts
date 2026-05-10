// This file contains auth-related TypeScript types.
//
// Why this exists:
// - Keeps auth contracts centralized
// - Improves scalability
// - Makes context strongly typed

export interface AuthContextValue {
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => void;

  logout: () => void;

  showAuthModal: boolean;

  authMode: 'login' | 'signup';

  openLogin: () => void;

  openSignup: () => void;

  closeAuthModal: () => void;
}

