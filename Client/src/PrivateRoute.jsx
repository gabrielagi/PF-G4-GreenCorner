import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, isLoading}) => {
  return isAuthenticated || isLoading  ? element : <Navigate to="/" />;
};

export default PrivateRoute;
