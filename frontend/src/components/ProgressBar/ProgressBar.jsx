import React from "react";
import {Progress} from 'reactstrap';



const ProgressBar = ({ completed, lable, colorClass }) => {
    const className = `progress-container progress-${colorClass}`;
    const barClassName = `progress-bar-${colorClass}`;
  return (
    <div className={className}>
      <span className="progress-badge">{lable}</span>
      <Progress max="100" value={completed} barClassName={barClassName}>
        <span className="progress-value">{completed} %</span>
      </Progress>
    </div>
  );
};

export default ProgressBar;
