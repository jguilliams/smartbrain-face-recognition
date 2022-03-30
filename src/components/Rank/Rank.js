import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div className="center fw4">
      <div className="form ba bw1 br3">
        <div className="light-gray f3">{`${name}, your current entry count is...`}</div>
        <div className="light-gray f1">{entries}</div>
      </div>
    </div>
  );
};

export default Rank;
