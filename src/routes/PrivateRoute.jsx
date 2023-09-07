import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isUserLoading, user } = useSelector((store) => store.authSlice);
  const location = useLocation();

  return !isUserLoading ? (
    user ? (
      children
    ) : (
      <Navigate to="/" state={{ fromURL: location }} replace={true}></Navigate>
    )
  ) : null;
};

export default PrivateRoute;
