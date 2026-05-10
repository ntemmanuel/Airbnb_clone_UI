import type { ReactNode } from 'react';

import toast from 'react-hot-toast';

import {
  Navigate,
} from 'react-router-dom';

import { useAuth } from '../../features/auth';

// Props
interface Props {
  children: ReactNode;
}

// Route guard component
//
// Responsibilities:
// - Protect private pages
// - Redirect unauthenticated users
// - Show feedback toast
//
// Why this exists:
// Keeps auth protection reusable
// across many routes.

export const ProtectedRoute = ({
  children,
}: Props) => {
  const { isAuthenticated } = useAuth();

  // User NOT authenticated
  if (!isAuthenticated) {
    toast.error(
      'Please log in to access this page'
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User authenticated
  return children;
};