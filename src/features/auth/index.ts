// This file defines auth-related types.
//
// Why this exists:
// - Keeps auth contracts centralized
// - Makes context strongly typed
// - Improves scalability

export interface AuthContextValue {
  // Whether the user is logged in
  isAuthenticated: boolean;

  // Login function
  login: (
    email: string,
    password: string
  ) => void;

  // Logout function
  logout: () => void;
}

export { LoginPage } from './pages/LoginPage';
export { DashboardPage } from './pages/DashboardPage';

export { LoginForm } from './components/LoginForm';

export { useAuth } from './hooks/useAuth';

export { AuthProvider } from './context/AuthProvider';