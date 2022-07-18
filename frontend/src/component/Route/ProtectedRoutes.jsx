import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {Navigate} from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoutes = ({Component}) => {
  const {loading, isAuthenticated} = useSelector((state) => state.user);

  return (
    <Fragment>
      {!loading ? (isAuthenticated ? <Component /> : <Navigate to="/login"/>):(<Loader/>)}
    </Fragment>
  );
};

export default ProtectedRoutes;
