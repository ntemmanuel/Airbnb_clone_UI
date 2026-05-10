import { createContext } from 'react';

import type { AuthContextValue } from '../types';

// Global auth context
//
// Starts undefined until wrapped
// by AuthProvider.

export const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);