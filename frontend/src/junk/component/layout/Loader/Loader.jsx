import React from "react";
import "./Loader.css";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
const Loader = () => {
  return (
    <div className="loading">
      <ClimbingBoxLoader size={30} color={'#ba04dd'}/>
    </div>
  );
};

export default Loader;
