import React, { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Login from "../pages/auth/Login";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
