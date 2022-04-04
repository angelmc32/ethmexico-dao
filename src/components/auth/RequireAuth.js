import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

const RequireAuth = () => {
  const { isLoggedIn, token } = useAppContext();
  const location = useLocation();
  console.log("Is user logged in?:", isLoggedIn);
  console.log("There is no token:", token == undefined);

  // Check with token or with isLoggedIn?
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
