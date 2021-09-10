import React from "react";
import "../css/Loading.css";
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner-wrapper">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
