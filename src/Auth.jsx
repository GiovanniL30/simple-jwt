import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Auth = () => {
  return false ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
