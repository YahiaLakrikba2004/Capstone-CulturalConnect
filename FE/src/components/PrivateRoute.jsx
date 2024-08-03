import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Usa il contesto per determinare l'autenticazione

  if (!isAuthenticated) {
    // Se non autenticato, reindirizza al login
    return <Navigate to="/login" />;
  }

  // Se autenticato, visualizza i figli
  return <Outlet />;
};

export default PrivateRoute;
