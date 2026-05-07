import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';


import App from './App';
import { StoreProvider } from './store/StoreProvider';

import './index.css';


// This is the true application entry point.
//
// Responsibilities:
// - Mount React into the DOM
// - Wrap the app with global providers
// - Configure app-wide systems (toasts, store, etc.)
//
// Why StoreProvider goes here:
// - Makes global state accessible everywhere
//
// Why Toaster goes here:
// - Makes toast notifications available globally

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />

      {/* Global toast notifications */}
      <Toaster position="bottom-right" />
    </StoreProvider>
  </React.StrictMode>
);
