/* eslint-disable react/prop-types */

import { createContext, useEffect, useMemo, useState } from "react";
import { env } from "../constants";

/**
 * @typedef {{
 * user?: Record<string, any>;
 * loading: boolean;
 * error?: any;
 * login: (credentials: Record<string, any>) => void;
 * signUp: (credentials: Record<string, any>) => void;
 * logout: () => void;
 * setUser: React.Dispatch<React.SetStateAction<Record<string, any> | undefined>>
 *  }} SocialAuthContextType
 */

/**
 * @type {React.Context<SocialAuthContextType>}
 */
export const SocialAuthContext = createContext({
  user: null,
  loading: false,
  error: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  signUp: () => {},
});

export const SocialAuthProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const getCurrentUser = () => {
      setLoading(true);
      fetch(`${env.VITE_API_ENDPOINT}/auth/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
          setLoadingInitial(false);
        });
    };
    getCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (credentials) => {
    setLoading(true);
    // TODO: Add username/password login
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve({
          email: "test@example.com",
          id: 1,
          ...credentials,
        });
      }, 1000);
    });
  };

  const signUp = (credentials) => {
    setLoading(true);
    // TODO: Add username/password sign up
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve({
          email: "new.test@example.com",
          id: 2,
          ...credentials,
        });
      }, 1000);
    });
  };

  const logout = async () => {
    setLoading(true);
    fetch(`${env.VITE_API_ENDPOINT}/auth/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  };

  const memorizedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
      setUser,
    }),
    [user, loading, error]
  );

  return (
    <SocialAuthContext.Provider value={memorizedValue}>
      {!loadingInitial ? props.children : <h1>Logging you in...</h1>}
    </SocialAuthContext.Provider>
  );
};
