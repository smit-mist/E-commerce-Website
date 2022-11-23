import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoutes = ({ isAdmin, Component }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log("Inside protected routes");
  // if (isAdmin) {
  //   if (!user) {
  //     console.log("INTO LOGIN");
  //     return <Navigate to="/login" />;
  //   }
  //   if (user.role !== "admin") {
  //     console.log("INTO LOGIN");

  //     return <Navigate to="/login" />;
  //   }
  // }
  useEffect(() => {
    if(!loading){
      if(isAdmin === true){

      }
      else{
        if(isAuthenticated){

        }
      }
    }
  }, [loading,isAuthenticated,user, isAdmin])
  
  if (loading) {
    return <Loader />;
  }
 
  if (isAdmin === true) {
    console.log("This is admin route");
    if (isAuthenticated && user.role === "admin") {
      return <Component />;
    }
    return <Navigate to="/login" />;
  }
  if (isAuthenticated) {
    console.log("Normal and auth");
    return <Component />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
