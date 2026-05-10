import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import App from './App';


import { StoreProvider } from './store/StoreProvider';

import { AuthProvider } from './features/auth/context/AuthProvider';

import './index.css';

// Root application entry point
//
// Global providers are layered here:
//
// BrowserRouter
//   → routing
//
// AuthProvider
//   → authentication state
//
// StoreProvider
//   → app data state
//
// Toaster
//   → notifications

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <App />

          <Toaster position="bottom-right" />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);