import { useState } from 'react';
import type { FormEvent } from 'react';

import { useAuth } from '../hooks/useAuth';

// Props passed from LoginPage
interface Props {
  onSuccess: () => void;
}

// Login form component
//
// Responsibilities:
// - Collect email/password input
// - Call login()
// - Notify parent on success
//
// Why this exists:
// - Keeps form UI isolated
// - Keeps LoginPage cleaner
// - Makes auth form reusable

export const LoginForm = ({ onSuccess }: Props) => {
  const { login } = useAuth();

  // Local form state
  //
  // Form inputs are temporary UI state,
  // so local component state is appropriate here.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trigger fake login
    login(email, password);

    // Notify page
    onSuccess();
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <h1 className='login-form__title'>Login</h1>

      {/* Email */}
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Submit */}
      <button type='submit'>Sign In</button>
    </form>
  );
};
