import React from "react";
import "./Jobly.css";

function Jobly({ user }) {
  return (
    <div className="Homepage">
      <div className="center-content">
        <h1>
          <strong>Jobly</strong>
        </h1>
        <p>All the jobs in one, convenient place.</p>
        <h3>{`Welcome Back, ${user.firstName}`}</h3>
      </div>
    </div>
  );
}

export default Jobly;
