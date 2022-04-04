import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

const AuthRouter = () => {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <Routes>
      <Route
        path="/registro"
        element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AuthRouter;
