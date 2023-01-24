import React from "react";

function JobCard({ name, company, salary, equity }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{company}</p>
      <p>{salary}</p>
      <p>{equity}</p>
    </div>
  );
}

export default JobCard;
