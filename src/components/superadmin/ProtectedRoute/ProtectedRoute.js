import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
