import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticatedUser, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner component
  }

  return isAuthenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
