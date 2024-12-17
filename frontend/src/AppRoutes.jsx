import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import Login from "./pages/Login";
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
// Add these imports
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';

// Logout functionality
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// Register with logout
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing page as the initial route */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected dashboard route */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Auth routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<RegisterAndLogout />} />
      
      {/* 404 route */}
      <Route path='*' element={<NotFound />} />

        {/* Add these new routes inside ProtectedRoute since payments require auth */}
        <Route
        path='/payment'
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/success'
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;