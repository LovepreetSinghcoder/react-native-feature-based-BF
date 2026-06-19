import React, { createContext, useEffect, useState } from "react";
import { authService } from "@lib/services/auth.service";

import { setLogoutHandler } from "@lib/events/auth.events";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Auto login
  useEffect(() => {
    const loadAuth = async () => {
      try {

        const data = await authService.getStoredAuth();

        if (data?.accessToken) {
          // 🔥 Verify with backend
          const userData = await authService.checkAuth();

          setUser(userData);
          setUserToken(data.accessToken);
        } else {
          setUser(null);
          setUserToken(null);
        }
      } catch (err) {
        // ❌ Token invalid / expired
        await authService.logout();
        setUser(null);
        setUserToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // 🔥 Register logout globally
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);

      const data = await authService.loginWithGoogle();

      setUser(data.user);
      setUserToken(data.token);

      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setUserToken(null);
    await authService.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        loading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
