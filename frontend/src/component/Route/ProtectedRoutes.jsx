import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {Navigate} from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoutes = ({isAdmin, Component}) => {
  const {loading, isAuthenticated, user} = useSelector((state) => state.user);


  if(isAdmin){
    if(!user){
      return <Navigate to="/login"/>
    }
    if(user.role !== "admin"){
      return <Navigate to="/login"/>
    }
  }
  
  return (
    <Fragment>
      {!loading ? (isAuthenticated ? <Component /> : <Navigate to="/login"/>):(<Loader/>)}
    </Fragment>
  );
};

export default ProtectedRoutes;
