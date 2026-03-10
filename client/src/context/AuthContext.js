"use client";

import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);

  // SSR-safe defaults
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load token + user on client mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = safeJsonParse(localStorage.getItem("user"));

      setToken(storedToken);
      setUser(storedUser);
      setIsLoggedIn(!!storedToken);
    } catch {
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setReady(true);
    }
  }, []);

  // Sync across tabs (token + user)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        setToken(event.newValue);
        setIsLoggedIn(!!event.newValue);
      }

      if (event.key === "user") {
        setUser(event.newValue ? safeJsonParse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /**
   * login now accepts either:
   * - login(tokenString)  (backwards compatible)
   * - login({ token, user })
   */
  const login = (arg) => {
    const newToken = typeof arg === "string" ? arg : arg?.token;
    const newUser = typeof arg === "string" ? null : arg?.user ?? null;

    if (!newToken) return;

    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ ready, isLoggedIn, token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);