import React from 'react';
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Redirect to="./login" />
};

export default ProtectedRoute;