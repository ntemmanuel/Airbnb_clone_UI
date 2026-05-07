import type { ReactNode } from 'react';
import { useReducer } from 'react';


import { reducer } from './reducer';
import type { State } from './types';

import { StoreContext } from './context';

// Initial global state
const initialState: State = {
  listings: [],
  loading: false,
  filter: '',
  saved: [],
};

// Provider props
interface Props {
  children: ReactNode;
}

// Provides global store to entire app
export const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};