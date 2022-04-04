import { Fragment, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RequireAuth from "../components/auth/RequireAuth";
import AuthRouter from "./AuthRouter";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/home/Home";
import Account from "../pages/account/Account";

const Router = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div className="uk-section mc-content">
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn ? <Home /> : <LandingPage />}
        />
        <Route path="/auth/*" element={<AuthRouter />} />

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Router;
