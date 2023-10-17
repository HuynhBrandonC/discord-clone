import React, { useEffect } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  } else {
    return children;
  }
};
