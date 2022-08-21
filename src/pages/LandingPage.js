import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import { lensLogin } from "../helpers/lens/lens-login-user";

const LandingPage = () => {
  const { address, connectWallet, updateLensAuthToken } = useAppContext();

  const handleLensLogin = async () => {
    try {
      const { data } = await lensLogin();
      updateLensAuthToken(data.authenticate.accessToken);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <h1>Landing Page</h1>
      <div className="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
        {!address ? (
          <Fragment>
            <button
              className="uk-button uk-button-primary uk-width-1-2 uk-width-1-3@s uk-margin-bottom"
              onClick={handleLensLogin}
            >
              Log in with Lens Protocol
            </button>
            <button
              className="uk-button uk-button-primary uk-width-1-2 uk-width-1-3@s uk-margin-bottom"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </Fragment>
        ) : (
          <div className="uk-flex uk-flex-center uk-margin uk-width-1-1 uk-width-1-2@s">
            <NavLink to="/bounties">
              <button className="uk-button uk-button-primary">
                Go to dashboard!
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default LandingPage;
