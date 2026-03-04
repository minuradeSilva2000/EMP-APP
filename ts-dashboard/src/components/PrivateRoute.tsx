import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  console.log('PrivateRoute - isAuthenticated:', isAuthenticated);
  console.log('PrivateRoute - current path:', window.location.pathname);

  if (!isAuthenticated) {
    console.log('PrivateRoute - Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('PrivateRoute - Rendering protected content');
  return <>{children}</>;
};

export default PrivateRoute;
