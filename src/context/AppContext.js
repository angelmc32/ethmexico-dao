import React, { createContext, useCallback, useEffect, useState } from "react";
import Pool from "../helpers/aws/UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

let logoutTimer;

export const AppContext = createContext({
  user: {},
  updateUser: () => {},
  token: "",
  isLoggedIn: false,
  userLogin: (user, token) => {},
  userLogout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedExpirationTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token") || null;
  const storedExpirationDate = localStorage.getItem("expirationTime") || null;

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return {
    token: storedToken,
    expirationTime: remainingTime,
  };
};

const getCognitoUserSession = async () => {
  const result = await new Promise((resolve, reject) => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject();
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });

  return result;
};

const AppProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  getCognitoUserSession()
    .then((session) => {
      setIsLoggedInState(true);
    })
    .catch((err) => setIsLoggedInState(false)); // Revisar si hay problema con isLoggedIn
  let initialTokenState = null;
  const initialUserState = JSON.parse(localStorage.getItem("user")) || {};
  if (tokenData) {
    initialTokenState = tokenData.token;
  }
  const [userState, setUserState] = useState(initialUserState);
  const [tokenState, setTokenState] = useState(initialTokenState);
  const [isLoggedInState, setIsLoggedInState] = useState(!!tokenState);

  const logoutHandler = useCallback(() => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }

    setUserState({});
    setTokenState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (user, token, expirationTime = 72000) => {
    setUserState(user);
    setTokenState(token);
    setIsLoggedInState(true);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const userAWSCognito = new CognitoUser({
        Username,
        Pool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      userAWSCognito.authenticateUser(authDetails, {
        onSuccess: (data) => {
          const { jwtToken: token } = data.idToken;
          const { email, email_verified, sub } = data.idToken.payload;
          const user = { email, email_verified, sub };
          loginHandler(user, token);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure: ", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          resolve(data);
        },
      });
    });
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.expirationTime);
    }
  }, [tokenData, logoutHandler]);

  const appContextValue = {
    user: userState,
    updateUser: setUserState,
    token: tokenState,
    isLoggedIn: isLoggedInState,
    userLogin: authenticate,
    userLogout: logoutHandler,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
