import { useAuth } from '../hooks/useAuth';

import { useStore } from '../../../store/useStore';

// Dashboard page
//
// Responsibilities:
// - Show authenticated user area
// - Display app-related user info
//
// This page proves:
// - auth context works
// - global store works
// - features can communicate safely

export const DashboardPage = () => {
  const { logout } = useAuth();

  const { state } = useStore();

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <p>
        Welcome back 👋
      </p>

      <p>
        You have{' '}
        <strong>
          {state.saved.length}
        </strong>{' '}
        saved listing
        {state.saved.length !== 1 && 's'}.
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};