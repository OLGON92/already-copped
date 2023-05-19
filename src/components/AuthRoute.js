import React from "react";  
import { useAuth } from "../context/AuthProvider"; 
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/signIn"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;


//Keep in case above code doesnt work
//<Outlet /> : <Navigate to={{ pathname: "/signIn", state: { from: location } }} />;