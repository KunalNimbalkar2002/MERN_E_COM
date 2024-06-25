import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  const User = localStorage.getItem("user");
  const { isAuthenticatedUser, loading } = useSelector((state) => state.user);
  const location = useLocation();

  if (!User) {
    return <div>Loading Protected Routes...</div>; // or any loading spinner component
  }

  return User ? (
    <Outlet />
  ) : (
    (console.log("---------rendering to protected routes--------"),
    (<Navigate to="/login" state={{ from: location }} replace />))
  );
};

export default ProtectedRoutes;
