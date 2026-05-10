import { lazy, Suspense, useEffect } from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

import { ListingsPage } from './features/listings';

import { LoginPage } from './features/auth';

import { Navbar } from './shared/components/Navbar';

import { Spinner } from './shared/components/Spinner';

import { NotFound } from './shared/components/NotFound';

import { ProtectedRoute } from './shared/components/ProtectedRoute';
import './App.css';

// Lazy-loaded pages
//
// These pages are split into separate
// JavaScript chunks and loaded only
// when visited.

const ListingDetail = lazy(() =>
  import('./features/listings/pages/ListingDetail').then((module) => ({
    default: module.ListingDetail,
  })),
);

const DashboardPage = lazy(() =>
  import('./features/auth/pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
);

// Root application routes
//
// IMPORTANT:
// App.tsx contains routing ONLY.

function App() {
  // Current route location
  const location = useLocation();

  // Route loading progress bar
  //
  // Shows visual feedback during
  // navigation and lazy loading.
  useEffect(() => {
    // Start progress
    NProgress.start();

    // Finish after small delay
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [location]);

  return (
    <>
      <Navbar />

      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Home */}
          <Route path='/' element={<ListingsPage />} />

          {/* Listing detail */}
          <Route path='/listings/:id' element={<ListingDetail />} />

          {/* Login */}
          <Route path='/login' element={<LoginPage />} />

          {/* Protected dashboard */}
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
