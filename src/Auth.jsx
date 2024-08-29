import React from "react";
import { useAuth } from "./AuthContext";

import { Outlet, Navigate } from "react-router-dom";

const Auth = () => {
  const { token } = useAuth();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login?message=Please log in first" />
  );
};

export default Auth;
