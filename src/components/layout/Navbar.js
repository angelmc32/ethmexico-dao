import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import useAppContext from "../../hooks/useAppContext";

const routes = [
  ["Solutions", "/solutions"],
  ["Contact", "/contact"],
  ["Account (Protected)", "/account"],
];

const Navbar = () => {
  const { isLoggedIn, userLogout } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    userLogout();
    navigate("/", { replace: true });
  };
  return (
    <nav className="uk-navbar-container" uk-navbar="true">
      <div className="uk-navbar-left uk-margin-left">
        <ul className="uk-navbar-nav">
          <li>
            <NavLink to="/">
              <img
                data-src={logo}
                width="48"
                height="48"
                alt=""
                data-uk-img=""
                uk-image="true"
              />
              LOGO
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right uk-margin-right">
        <ul className="uk-navbar-nav">
          {routes.map((route, index) => {
            return (
              <li key={index}>
                <NavLink to={`${route[1]}`}>{route[0]}</NavLink>
              </li>
            );
          })}
          <li className="uk-flex uk-flex-middle">
            {!isLoggedIn ? (
              <NavLink to="/auth/login">
                <button className="uk-button uk-button-primary">Login</button>
              </NavLink>
            ) : (
              <button
                className="uk-button uk-button-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
