import { createContext } from 'react';

import type { Action, State } from './types';

// Shape of store context value
export interface StoreContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Global store context
//
// Starts as undefined until wrapped by StoreProvider
export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined,
);
