import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

const RequireAuth = () => {
  const { address } = useAppContext();
  const location = useLocation();
  console.log("Is user logged in?:", address);

  // Check with token or with isLoggedIn?
  return address ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
