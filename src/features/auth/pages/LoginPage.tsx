import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';

// Login page
//
// Responsibilities:
// - Render login form
// - Handle navigation after login
//
// Why redirect here instead of inside the form?
// Because navigation is page-level behavior.

export const LoginPage = () => {
  const navigate = useNavigate();

  // Redirect after successful login
  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};